import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/ui/custom/InputField";
import CustomButton from "../components/ui/custom/CustomButton";
import api from "../api/axios";
import useNotify from "../hooks/useNotify";

const LoginPage = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        // notify("warning", "Missing fields", "Please fill all the fields.");
        return;
      }

      const response = await api.post("/auth/login", formData);
      const { access_token } = response.data;
      sessionStorage.setItem("authToken", access_token);

      // notify("success", "Login successful", "Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed: ", error);
      // notify(
      //   "error",
      //   "Login failed",
      //   error.response?.data?.detail || "Invalid credentials"
      // );
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <CustomButton type="submit" className="w-full">
                Login
              </CustomButton>
            </form>
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
