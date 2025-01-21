import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
      <div className="flex items-center justify-center space-x-2  w-full">
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
        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 min-h-screen no-scrollbar scroll-smooth flex flex-col items-center">
          <div className="container mx-auto max-w-4xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
