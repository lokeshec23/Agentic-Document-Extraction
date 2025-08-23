import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const ExtractionPanel = () => {
  const [markdown, setMarkdown] = useState(
    `# Example Markdown\n\n- Item 1\n- Item 2`
  );
  const [jsonData, setJsonData] = useState({ name: "Invoice", total: 1234 });
  const [chat, setChat] = useState([
    { role: "assistant", content: "Hi! Ask me about this PDF." },
  ]);
  const [input, setInput] = useState("");

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleDownload = (content, type) => {
    try {
      const blob = new Blob(
        [type === "json" ? JSON.stringify(content, null, 2) : content],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `extraction.${type}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");

    // Fake AI response
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "This is a mock AI response." },
      ]);
    }, 1000);
  };

  return (
    <Tabs defaultValue="parse" className="h-full flex flex-col">
      <TabsList className="flex">
        <TabsTrigger value="parse">Parse</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      {/* Parse Section */}
      <TabsContent value="parse" className="flex-1 p-4 overflow-y-auto">
        <Tabs defaultValue="markdown">
          <TabsList>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="markdown" className="space-y-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <pre className="whitespace-pre-wrap">{markdown}</pre>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleCopy(markdown)}>
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <Button onClick={() => handleDownload(markdown, "md")}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="json" className="space-y-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleCopy(JSON.stringify(jsonData, null, 2))}
              >
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <Button onClick={() => handleDownload(jsonData, "json")}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>

      {/* Chat Section */}
      <TabsContent value="chat" className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-2">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleChatSubmit} className="flex mt-2 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 rounded-md border dark:bg-gray-900 dark:text-gray-100 px-2 py-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default ExtractionPanel;
