import React from "react";
import FileUpload from "../components/ui/custom/FileUpload";
import Workspace from "../components/ui/custom/Workspace";
import { DashboardProvider } from "../context/DashboardContext";

const Dashboard = () => {
  try {
    return (
      <DashboardProvider>
        <div className="flex h-[calc(100vh-4rem)]">
          {" "}
          {/* minus header height */}
          <FileUpload />
          <Workspace />
        </div>
      </DashboardProvider>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <p>Error loading dashboard</p>;
  }
};

export default Dashboard;
