import React, { useContext, Suspense, lazy } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Loader from "../../ui/custom/Loader";

// Lazy load heavy components
const PdfViewer = lazy(() => import("../custom/PdfViewer"));
const ExtractionPanel = lazy(() => import("../custom/ExtractionPanel"));

const Workspace = () => {
  const { files } = useContext(DashboardContext);

  if (!files.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
        Upload a file to start
      </div>
    );
  }

  return (
    <PanelGroup
      direction="horizontal"
      className="flex-1 h-full overflow-hidden"
    >
      {/* Left Panel - PDF Viewer */}
      <Panel defaultSize={50} minSize={25}>
        <div className="h-full overflow-y-auto">
          <Suspense fallback={<Loader />}>
            <PdfViewer />
          </Suspense>
        </div>
      </Panel>

      {/* Resize Handle */}
      <PanelResizeHandle
        className="w-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 
        dark:hover:bg-gray-600 cursor-col-resize transition-colors relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[2px] h-10 bg-gray-500 rounded dark:bg-gray-400" />
        </div>
      </PanelResizeHandle>

      {/* Right Panel - Extraction */}
      <Panel defaultSize={50} minSize={25}>
        <div className="h-full overflow-y-auto">
          <Suspense fallback={<Loader />}>
            <ExtractionPanel />
          </Suspense>
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default Workspace;
