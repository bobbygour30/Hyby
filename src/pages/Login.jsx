import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/Button";
import assets from "../assets/assets";
// import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

export function Login() {
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(
        `http://75.119.146.185:4444/api/get_user/${formData.phoneNumber}`
      );
      console.log(response);
      
      if (!response.ok) {
        throw new Error("User not found");
      }
      const user = await response.json();

      if (user.password === formData.password) {
        alert("Login successful!");
        navigate("/influencer");
      } else {
        setErrorMessage("Invalid phone number or password.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorMessage("Invalid phone number or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-purple-100 via-white to-purple-100">
      {/* <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0" /> */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto p-6 rounded-3xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-script text-black mb-6 sm:mb-8">
          Welcome Back!
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 sm:space-y-6">
          <div>
            <p className="text-white text-sm mb-2">Log In With Your Mobile Number *</p>
            <PhoneInput
              value={formData.phoneNumber}
              onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
            />
          </div>

          <PasswordInput
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <Button type="submit" className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-4 sm:py-2">
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

// PasswordInput Component
export function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full max-w-md">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="******************"
        className="rounded-full bg-white px-3 py-2 w-full text-black"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
      </button>
    </div>
  );
}

// PhoneInput Component
export function PhoneInput({ value, onChange }) {
  return (
    <div className="flex bg-white rounded-full overflow-hidden w-full max-w-md">
      <div className="flex items-center px-3 border-r">
        <img src={assets.Flag} alt="IN" className="mr-1 w-5 h-4" />
        <span className="text-gray-600">+91</span>
      </div>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="80 766 0---"
        className="flex-1 px-3 py-2 outline-none w-full text-black"
      />
    </div>
  );
}