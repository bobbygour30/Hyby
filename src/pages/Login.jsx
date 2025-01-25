import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Eye, EyeOff } from "lucide-react";

import { Button } from "../components/Button";
import assets from "../assets/assets";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

export function Login() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen relative">
      {/* Gradient Animation Background */}
      <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto p-6 rounded-3xl  text-white">
        <button
          className="text-white w-10 h-10 flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          
        </button>

        <div className="flex-1 flex flex-col items-center justify-center -mt-10 sm:-mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-script text-white mb-6 sm:mb-8">
            Welcome Back!
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-4 sm:space-y-6"
          >
            <div>
              <p className="text-white text-sm mb-2">
                Log In With Your Mobile Number *
              </p>
              <PhoneInput
                value={formData.phoneNumber}
                onChange={(value) =>
                  setFormData({ ...formData, phoneNumber: value })
                }
              />
            </div>

            <PasswordInput
              value={formData.password}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
            />

            <div className="text-right">
              <button
                className="text-white text-sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-4 sm:py-2"
            >
              Log In
            </Button>

            <div className="text-center text-white">
              <p className="text-sm">New User? Sign Up</p>
              <button
                onClick={() => navigate("/sign-up")}
                className="mt-2 p-2 w-full rounded-full border-2 border-white text-white hover:bg-white/10"
              >
                Register
              </button>
            </div>

            <div className="flex items-center gap-4 my-4 sm:my-6">
              <div className="h-px bg-white flex-1" />
              <span className="text-white">Or</span>
              <div className="h-px bg-white flex-1" />
            </div>

            <div>
              <p className="text-white text-sm text-center mb-4">
                Log In With Other Option
              </p>
              <div className="flex justify-center gap-4 sm:gap-6">
                <SocialLoginButton provider="google" icon={assets.Google} />
              </div>
            </div>
          </form>
        </div>
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
          className="rounded-full bg-white px-3 py-2 w-full"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
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
          className="flex-1 px-3 py-2 outline-none w-full"
        />
      </div>
    );
  }
  
  // SocialLoginButton Component
  export function SocialLoginButton({ provider, icon }) {
    return (
      <button
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
        onClick={() => console.log(`Login with ${provider}`)}
      >
        <img src={icon || "/placeholder.svg"} alt={`Login with ${provider}`} />
      </button>
    );
  }
