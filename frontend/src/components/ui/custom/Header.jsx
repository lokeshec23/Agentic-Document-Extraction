import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import ProtectedRoute from "./../../../context/ProtectedRoute";

const Header = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState(false);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDarkMode = () => {
    try {
      setIsDark((prev) => !prev);
      document.documentElement.classList.toggle("dark");
    } catch (error) {
      console.error("Dark mode toggle failed:", error);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between px-6 shadow-md bg-white dark:bg-gray-900">
      {/* Left: App Name */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        DocLens
      </h3>

      {/* Right side is protected */}
      <ProtectedRoute>
        <div className="flex items-center space-x-6">
          {/* Dark Mode Switch */}
          <div className="flex items-center space-x-2">
            <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Dark Mode
            </span>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ProtectedRoute>
    </header>
  );
};

export default Header;
