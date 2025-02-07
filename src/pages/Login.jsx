import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/Button";
import assets from "../assets/assets";

export function Login() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]); // Added navigate to dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setLoading(false);
      return;
    }

    try {
      // Removed email from URL and fixed extra spaces
      const response = await fetch(`http://75.119.146.185:4444/login?phone=${formData.phone}&password=${formData.password}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail?.[0]?.msg || "Invalid phone number or password.");
      }

      localStorage.setItem("access_token", data.access_token);
      alert("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-purple-100 via-white to-purple-100">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto p-6 rounded-3xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-script text-black mb-6 sm:mb-8">
          Welcome Back!
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <div className="flex bg-gray-200 text-black rounded-full items-center px-3 w-20">
                <img src={assets.Flag} alt="IN" className="mr-1 w-4 h-4" />
                <span>+91</span>
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="80 766 12345"
                className="flex-1 p-2 rounded-full bg-gray-200 text-black"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-black"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? <Eye /> : <EyeOff />}
              </span>
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <Button
            type="submit"
            className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <p className="text-center text-black">
            New User?{" "}
            <button className="text-yellow-500" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
