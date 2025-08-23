import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import InputField from "../components/ui/custom/InputField";
import CustomButton from "../components/ui/custom/CustomButton";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with: ", formData);
      // call API here...
      sessionStorage.setItem("authToken", "9361062252");
      navigate("/dashboard"); // ✅ React Router navigation
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex h-full  items-center justify-center  p-4">
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
              <div>
                {/* <Label htmlFor="email">Email</Label> */}
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com (Email)"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                {/* <Label htmlFor="password">Password</Label> */}
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="•••••••• (Password)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
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
