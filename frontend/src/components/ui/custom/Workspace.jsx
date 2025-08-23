import React, { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

const Workspace = () => {
  const { files, isCollapsed } = useContext(DashboardContext);

  return (
    <div
      className={`h-full transition-all duration-300 ${
        isCollapsed ? "w-full" : "w-4/5"
      } bg-white dark:bg-gray-950 p-6`}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Workspace
      </h2>
      {files.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No files uploaded yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {files.map((file, idx) => (
            <li
              key={idx}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Workspace;
