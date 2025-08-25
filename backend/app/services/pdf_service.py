import pdfplumber
from sentence_transformers import SentenceTransformer
import faiss
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import numpy as np
import torch

class PDFService:
    def __init__(self):
        """
        Initializes the service, loading the embedding and language models.
        """
        # Load a model for creating sentence embeddings
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Load a tokenizer and a smaller language model for text generation
        model_name = "distilgpt2"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.language_model = AutoModelForCausalLM.from_pretrained(model_name)
        
        # Set up a simple in-memory vector store using FAISS
        self.index = None
        self.text_chunks = []

    def extract_text_from_pdf(self, file_stream):
        """
        Extracts text from a PDF file stream.
        """
        text = ""
        with pdfplumber.open(file_stream) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text

    # def process_and_embed_pdf(self, file_stream):
    #     """
    #     Processes the PDF, extracts text, chunks it, and creates vector embeddings.
    #     """
    #     # 1. Extract Text
    #     full_text = self.extract_text_from_pdf(file_stream)
        
    #     # 2. Chunk Text (simple splitting by paragraph)
    #     self.text_chunks = [chunk for chunk in full_text.split('\n') if chunk.strip()]
    #     if not self.text_chunks:
    #         return {"error": "Could not extract text or text is empty."}

    #     # 3. Generate Embeddings
    #     embeddings = self.embedding_model.encode(self.text_chunks, convert_to_tensor=True)
        
    #     # 4. Create FAISS index
    #     embedding_dim = embeddings.shape[1]
    #     self.index = faiss.IndexFlatL2(embedding_dim)
    #     self.index.add(embeddings.cpu().numpy())
        
    #     print(f"Successfully processed and indexed {len(self.text_chunks)} text chunks.")
    #     return {"chunks": len(self.text_chunks)}


    def process_and_embed_pdf(self, file_stream):
        # 1. Extract Text
        full_text = self.extract_text_from_pdf(file_stream)

        # 2. Chunk Text (simple splitting by paragraph)
        self.text_chunks = [chunk for chunk in full_text.split('\n') if chunk.strip()]
        if not self.text_chunks:
            return {"error": "Could not extract text or text is empty."}

        # 3. Generate Embeddings
        embeddings = self.embedding_model.encode(self.text_chunks, convert_to_tensor=True)

        # 4. Create FAISS index
        embedding_dim = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(embedding_dim)
        self.index.add(embeddings.cpu().numpy())

        # 5. Build Markdown (simple version)
        markdown_output = "\n\n".join([f"- {chunk}" for chunk in self.text_chunks])

        # 6. Build JSON
        json_output = {
            "chunks": [{"id": i, "text": str(chunk)} for i, chunk in enumerate(self.text_chunks)],
            "markdown": markdown_output
        }


        return {
            "chunks": len(self.text_chunks),
            "markdown": markdown_output,
            "json": json_output
        }




    def generate_response(self, query, max_length=500):
        """
        Generates Markdown and JSON based on a query using the indexed document.
        """
        if self.index is None:
            return {"error": "PDF has not been processed yet."}

        # 1. Search for relevant context
        query_embedding = self.embedding_model.encode([query], convert_to_tensor=True)
        _, search_results = self.index.search(query_embedding.cpu().numpy(), k=3) # Get top 3 chunks
        
        relevant_context = " ".join([self.text_chunks[i] for i in search_results[0]])

        # 2. Build the prompt for the LLM
        prompt = f"""
        Based on the following context, please provide a response in both Markdown and JSON format.
        Context: "{relevant_context}"
        Query: "{query}"

        Provide a clear Markdown summary and a structured JSON object with the key information.
        """

        # 3. Generate text with the language model
        inputs = self.tokenizer(prompt, return_tensors="pt", max_length=1024, truncation=True)
        
        # Generate the output
        output_sequences = self.language_model.generate(
            input_ids=inputs['input_ids'],
            max_length=max_length,
            num_return_sequences=1,
            pad_token_id=self.tokenizer.eos_token_id, # Set pad_token_id to eos_token_id
            attention_mask=inputs['attention_mask']   # Pass attention_mask
        )
        
        generated_text = self.tokenizer.decode(output_sequences[0], skip_special_tokens=True)

        # A simple way to try and split the generated text into Markdown and JSON
        # This part might need more robust parsing depending on the model's output format
        try:
            # Assuming the model generates markdown first, then a JSON block
            markdown_part = generated_text.split("```json")[0]
            json_part_str = "{" + generated_text.split("{")[1].split("}")[0] + "}"
            import json
            json_part = json.loads(json_part_str)
        except (IndexError, json.JSONDecodeError):
            # Fallback if parsing fails
            markdown_part = generated_text
            json_part = {"error": "Failed to parse JSON from model output."}

        return {"markdown": markdown_part.strip(), "json": json_part}


# Create a single instance of the service to be used by the app
pdf_service = PDFService()