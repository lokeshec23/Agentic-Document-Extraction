import React, { useContext, Suspense, lazy } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Loader from "../../ui/custom/Loader";
import { FileText, MessageCircle } from "lucide-react";

// Lazy load heavy components
const PdfViewer = lazy(() => import("../custom/PdfViewer"));
const ExtractionPanel = lazy(() => import("../custom/ExtractionPanel"));

const Workspace = () => {
  const { files } = useContext(DashboardContext);

  if (!files.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-6 p-8 rounded-2xl shadow-md bg-white dark:bg-gray-800">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Drop a file to get started
          </h2>

          {/* Features */}
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300">
              <FileText className="h-8 w-8 text-blue-500" />
              <p className="text-sm font-medium">Parse Document</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300">
              <MessageCircle className="h-8 w-8 text-green-500" />
              <p className="text-sm font-medium">Chat with AI</p>
            </div>
          </div>
        </div>
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
