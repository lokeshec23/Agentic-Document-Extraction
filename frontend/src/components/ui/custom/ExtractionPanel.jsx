import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ParsePanel from "./ParsePanel";
import ChatPanel from "./ChatPanel";

const ExtractionPanel = () => {
  return (
    <Tabs defaultValue="parse" className="h-full flex flex-col p-2">
      {/* Main Tabs */}
      <TabsList className="flex">
        <TabsTrigger value="parse">Parse</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
      </TabsList>

      {/* Render Panels */}
      <TabsContent value="parse" className="flex-1 flex flex-col p-2">
        <ParsePanel />
      </TabsContent>
      <TabsContent value="chat" className="flex-1 flex flex-col p-2">
        <ChatPanel />
      </TabsContent>
    </Tabs>
  );
};

export default ExtractionPanel;
