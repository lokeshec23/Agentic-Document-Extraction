import React, { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import PdfViewer from "./PdfViewer";
import ExtractionPanel from "./ExtractionPanel";
const Workspace = () => {
  const { files, isCollapsed } = useContext(DashboardContext);

  return (
    <div className="h-full w-full overflow-hidden">
      <PanelGroup direction="horizontal">
        {/* Left Panel - PDF Viewer */}
        <Panel defaultSize={50} minSize={25}>
          <PdfViewer />
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-1 bg-gray-300 dark:bg-gray-700 cursor-col-resize" />

        {/* Right Panel - Extraction */}
        <Panel defaultSize={50} minSize={25}>
          <ExtractionPanel />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Workspace;
