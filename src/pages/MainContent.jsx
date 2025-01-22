import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Fire from "../pages/Fire";


const MainContent = () => {
  return (
    
      <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 min-h-screen no-scrollbar scroll-smooth flex flex-col items-center overflow-x-hidden">
        <div className="container mx-auto max-w-3xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fire" element={<Fire />} />
          </Routes>
          <Footer />
        </div>
      </div>
    
  );
};

export default MainContent;
