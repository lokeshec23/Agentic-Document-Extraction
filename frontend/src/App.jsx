import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import Loader from "./components/ui/custom/Loader"; // global spinner
import Header from "./components/ui/custom/Header";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import { Toaster } from "./components/ui/";
// Lazy load routes
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const Dashboard = lazy(() => import("./pages/DashboardPage"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
          {/* <Toaster /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
