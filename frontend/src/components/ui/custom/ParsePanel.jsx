import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const ParsePanel = () => {
  const [markdown] = useState(`# Example Markdown\n\n- Item 1\n- Item 2`);
  const [jsonData] = useState({ name: "Invoice", total: 1234 });

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

  return (
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
              document.querySelector('[data-state="active"]').textContent ===
              "Markdown"
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
              document.querySelector('[data-state="active"]').textContent ===
              "Markdown"
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
  );
};

export default ParsePanel;
