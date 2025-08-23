import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/context/DashboardContext";

const ChatPanel = () => {
  const { chat, setChat } = useContext(DashboardContext);
  const [input, setInput] = useState("");

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
    <div
      className="flex-1 flex flex-col p-4 max-h-[85dvh]"
      // style={{ maxHeight: "85dvh !important" }}
    >
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
    </div>
  );
};

export default ChatPanel;
