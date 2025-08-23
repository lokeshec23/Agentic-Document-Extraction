import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import InputField from "../components/ui/custom/InputField";
import CustomButton from "../components/ui/custom/CustomButton";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Signing up with: ", formData);
      // call API here...
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center  p-4">
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
              <div>
                {/* <Label htmlFor="name">Full Name</Label> */}
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe (Name)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                {/* <Label htmlFor="email">Email</Label> */}
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
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
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
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
