import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/ui/custom/InputField";
import CustomButton from "../components/ui/custom/CustomButton";
import api from "../api/axios";
import useNotify from "../hooks/useNotify";

const SignupPage = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    try {
      if (!formData.username || !formData.email || !formData.password) {
        // notify("warning", "Missing fields", "Please fill all the fields.");
        return;
      }

      const res = await api.post("/auth/signup", formData);
      // notify("success", "Signup successful", "Welcome! You can now log in.");
      console.log("Signup response: ", res.data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed: ", error);
      // notify(
      //   "error",
      //   "Signup failed",
      //   error.response?.data?.detail || "Something went wrong"
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
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                id="username"
                name="username"
                type="text"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                required
              />
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
                Sign Up
              </CustomButton>
            </form>
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignupPage;
