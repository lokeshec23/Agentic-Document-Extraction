from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth
from app.services.pdf_service import pdf_service # Import our service instance
from pydantic import BaseModel

app = FastAPI(title="DocAI Backend")

# Allow frontend origin
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your existing auth router
app.include_router(auth.router)

# --- New Endpoints ---

@app.post("/pdf/upload")
async def upload_pdf(file: UploadFile = File(...)):
    print("Received file:", file.filename, file.content_type)
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")
    
    try:
        result = pdf_service.process_and_embed_pdf(file.file)
        # print("PDF Service result:", result)   # 👈 log here
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        # Return markdown + JSON
        return {
            "status": "success",
            "chunks": result["chunks"],
            "markdown": result["markdown"],
            "json": result["json"]
        }
    except Exception as e:
        import traceback
        print("Upload error:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



class ChatQuery(BaseModel):
    query: str

@app.post("/chat")
async def chat_with_doc(request: ChatQuery):
    """
    Endpoint to ask questions about the uploaded document.
    """
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    try:
        response = pdf_service.generate_response(request.query)
        if "error" in response:
            raise HTTPException(status_code=500, detail=response["error"])
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# --- Root endpoint for basic testing ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the DocAI Backend"}