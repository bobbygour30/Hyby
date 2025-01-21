import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import MainContent from "./pages/MainContent";
import assets from "./assets/assets";

const LoadingScreen = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-100">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className="w-52 mb-8 object-cover ml-2"
      />

      {/* Loading Animation */}
      <div className="flex items-center justify-center space-x-2 w-full">
        <span className="dot w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></span>
        <span
          className="dot w-4 h-4 rounded-full bg-gray-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="dot w-4 h-4 rounded-full bg-yellow-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/influencer" element={<MainContent />} />
        </Routes>
      )}
    </>
  );
};

export default App;
