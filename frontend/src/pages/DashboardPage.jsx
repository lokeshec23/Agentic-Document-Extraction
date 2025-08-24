import React, { Suspense, lazy } from "react";
import { DashboardProvider } from "../context/DashboardContext";
import Loader from "../components/ui/custom/Loader";
import Header from "../components/ui/custom/Header";
import FileUpload from "../components/ui/custom/FileUpload";

// Lazy load Workspace (contains PdfViewer + ExtractionPanel)
const Workspace = lazy(() => import("../components/ui/custom/Workspace"));

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <div className="flex flex-1">
          <FileUpload />
          <Suspense fallback={<Loader />}>
            <Workspace />
          </Suspense>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
