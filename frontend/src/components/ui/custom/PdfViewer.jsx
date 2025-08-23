import React, { useContext } from "react";
import { Document, Page } from "react-pdf";
import { DashboardContext } from "../../../context/DashboardContext";

const PdfViewer = () => {
  const { files } = useContext(DashboardContext);
  const file = files[0]; // just show first uploaded file for now

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        Upload a PDF to view
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-900 flex justify-center">
      <Document file={file} className="p-4">
        <Page pageNumber={1} width={500} />
        {/* Could add pagination for multi-page */}
      </Document>
    </div>
  );
};

export default PdfViewer;
