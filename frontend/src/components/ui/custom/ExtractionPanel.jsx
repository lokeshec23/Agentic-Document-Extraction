import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const ExtractionPanel = () => {
  const [markdown] = useState(`# Example Markdown\n\n- Item 1\n- Item 2`);
  const [jsonData] = useState({ name: "Invoice", total: 1234 });
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

    // Mock AI response
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "This is a mock AI response." },
      ]);
    }, 1000);
  };

  return (
    <Tabs defaultValue="parse" className="h-full flex flex-col p-2">
      {/* Main Tabs: Parse & Chat */}
      <TabsList className="flex">
        <TabsTrigger value="parse">Parse</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      {/* Parse Section */}
      <TabsContent
        value="parse"
        className="flex-1 flex flex-col p-4 overflow-y-auto"
      >
        <Tabs defaultValue="markdown" className="flex-1 flex flex-col">
          {/* Sub Tabs with Action Icons */}
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  document.querySelector('[data-state="active"]')
                    .textContent === "Markdown"
                    ? handleCopy(markdown)
                    : handleCopy(JSON.stringify(jsonData, null, 2))
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  document.querySelector('[data-state="active"]')
                    .textContent === "Markdown"
                    ? handleDownload(markdown, "md")
                    : handleDownload(jsonData, "json")
                }
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Markdown Content */}
          <TabsContent value="markdown" className="flex-1 mt-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded h-full overflow-y-auto">
              <pre className="whitespace-pre-wrap">{markdown}</pre>
            </div>
          </TabsContent>

          {/* JSON Content */}
          <TabsContent value="json" className="flex-1 mt-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded h-full overflow-y-auto">
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
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
