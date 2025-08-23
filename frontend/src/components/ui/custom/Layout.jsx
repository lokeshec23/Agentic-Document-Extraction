import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1 pt-2">{children}</main>
    </div>
  );
};

export default Layout;
