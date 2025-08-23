import React, { useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "../../../context/DashboardContext";

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
      className={`h-full border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 transition-all duration-300 ${
        isCollapsed ? "w-0 p-0" : "w-1/5"
      }`}
    >
      {!isCollapsed && (
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => fileInputRef.current.click()}
            className="w-full"
          >
            Upload File
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            variant="secondary"
            onClick={() => setIsCollapsed(true)}
            className="w-full"
          >
            Collapse
          </Button>
        </div>
      )}

      {isCollapsed && (
        <Button
          variant="secondary"
          onClick={() => setIsCollapsed(false)}
          className="absolute top-4 left-4"
        >
          Expand
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
