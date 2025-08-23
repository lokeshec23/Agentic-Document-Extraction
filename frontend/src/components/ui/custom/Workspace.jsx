import React, { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PdfViewer from "./PdfViewer";
import ExtractionPanel from "./ExtractionPanel";

const Workspace = () => {
  const { files } = useContext(DashboardContext);

  return (
    <div className="h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        {/* Left Panel - PDF Viewer */}
        <Panel defaultSize={50} minSize={25}>
          <PdfViewer />
        </Panel>

        {files.length > 0 && (
          <>
            {/* Resize Handle */}
            <PanelResizeHandle
              className="
                w-1 
                bg-gray-300 dark:bg-gray-700 
                hover:bg-gray-400 dark:hover:bg-gray-600 
                cursor-col-resize
                transition-colors
                relative
              "
            >
              {/* Optional: Add a subtle indicator line */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[2px] h-10 bg-gray-500 rounded dark:bg-gray-400" />
              </div>
            </PanelResizeHandle>

            {/* Right Panel - Extraction */}
            <Panel defaultSize={50} minSize={25}>
              <ExtractionPanel />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
};

export default Workspace;
