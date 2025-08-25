import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // file upload state
  const [files, setFiles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (files.length !== 0) {
      setIsCollapsed(true);
    }
  }, [files]);

  

  // extraction data stateWWWW
  const [markdown, setMarkdown] = useState(
    `# Example Markdown\n\n- Item 1\n- Item 2`
  );
  const [jsonData, setJsonData] = useState({
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
    name: "Invoice",
    total: 1234,
  });

  // chat state
  const [chat, setChat] = useState([
    { role: "assistant", content: "Hi! Ask me about this PDF." },
  ]);

  return (
    <DashboardContext.Provider
      value={{
        files,
        setFiles,
        isCollapsed,
        setIsCollapsed,
        markdown,
        setMarkdown,
        jsonData,
        setJsonData,
        chat,
        setChat,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
