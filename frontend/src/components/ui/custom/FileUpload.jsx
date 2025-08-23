import React, { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "../../../context/DashboardContext";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";

const FileUpload = () => {
  const { setFiles, isCollapsed, setIsCollapsed } =
    useContext(DashboardContext);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    try {
      const uploadedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div
      className={`relative h-full bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-0" : "w-1/5 min-w-[220px] max-w-[280px]"
      }`}
    >
      {/* Collapse / Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4  text-gray-800 dark:text-gray-200" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {!isCollapsed && (
        <div className="flex h-full flex-col gap-4 p-4">
          <Button
            onClick={() => fileInputRef.current.click()}
            className="w-full flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Sidebar content placeholder */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              JPG, PNG, PDF files supported
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
