import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // file upload state
  const [files, setFiles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // extraction data state
  const [markdown, setMarkdown] = useState(
    `# Example Markdown\n\n- Item 1\n- Item 2`
  );
  const [jsonData, setJsonData] = useState({ name: "Invoice", total: 1234 });

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
