import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  try {
    const auth = localStorage.getItem("authToken"); // you can store JWT or simple flag
    if (!auth) {
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (error) {
    console.error("Error in ProtectedRoute:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
