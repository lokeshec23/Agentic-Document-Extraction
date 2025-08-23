import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <DashboardContext.Provider
      value={{ files, setFiles, isCollapsed, setIsCollapsed }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
