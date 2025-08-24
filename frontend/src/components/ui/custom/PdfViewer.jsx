import React, { useContext, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { DashboardContext } from "../../../context/DashboardContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  Hand,
} from "lucide-react";

const PdfViewer = () => {
  const { files } = useContext(DashboardContext);
  const file = files[0];
  const containerRef = useRef(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isPanning, setIsPanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState({ left: 0, top: 0 });

  // Dynamically set default zoom based on container width
  useEffect(() => {
    const setDefaultZoom = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 800);
      }
    };
    setDefaultZoom();
    window.addEventListener("resize", setDefaultZoom);
    return () => window.removeEventListener("resize", setDefaultZoom);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(p + 1, numPages));

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const resetZoom = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setScale(width / 800);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "+") {
        e.preventDefault();
        zoomIn();
      }
      if (e.ctrlKey && e.key === "-") {
        e.preventDefault();
        zoomOut();
      }
      if (e.ctrlKey && e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle Pan Dragging
  const handleMouseDown = (e) => {
    if (!isPanning || !containerRef.current) return;
    setIsDragging(true);
    setStart({ x: e.clientX, y: e.clientY });
    setScroll({
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    containerRef.current.scrollLeft = scroll.left - dx;
    containerRef.current.scrollTop = scroll.top - dy;
  };

  const handleMouseUp = () => setIsDragging(false);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        Upload a PDF to view
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col bg-gray-100 dark:bg-gray-900"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* Left side - Zoom + Pan Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={resetZoom}>
            <RefreshCcw className="h-5 w-5" />
          </Button>
          <Button
            variant={isPanning ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setIsPanning((prev) => !prev)}
          >
            <Hand className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side - Page Navigation */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* PDF Content */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-auto flex justify-center no-scrollbar ${
          isPanning ? "cursor-grab" : "cursor-default"
        }`}
        onMouseDown={handleMouseDown}
      >
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
