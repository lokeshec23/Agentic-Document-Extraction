import React, { useContext, useState } from "react";
import { Document, Page } from "react-pdf";
import { DashboardContext } from "../../../context/DashboardContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const PdfViewer = () => {
  const { files } = useContext(DashboardContext);
  const file = files[0]; // show first uploaded file

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    try {
      setPageNumber((prev) => Math.max(prev - 1, 1));
    } catch (error) {
      console.error("Error going to previous page:", error);
    }
  };

  const goToNextPage = () => {
    try {
      setPageNumber((prev) => Math.min(prev + 1, numPages));
    } catch (error) {
      console.error("Error going to next page:", error);
    }
  };

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        Upload a PDF to view
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {pageNumber} of {numPages || "--"}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center items-center no-scrollbar">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="p-4"
        >
          <Page
            pageNumber={pageNumber}
            width={500}
            onRenderSuccess={() => setLoadingPage(false)}
            onLoadSuccess={() => setLoadingPage(false)}
            onLoadStart={() => setLoadingPage(true)}
          />
        </Document>

        {loadingPage && (
          <div className="absolute flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
