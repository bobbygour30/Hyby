import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainContent = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 min-h-screen no-scrollbar scroll-smooth flex flex-col items-center">
      <div className="container mx-auto max-w-4xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default MainContent;
