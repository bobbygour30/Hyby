import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Fire from "../pages/Fire";
import Projects from "../pages/Projects";

import Share from "../pages/Share";
import { Login } from "../pages/Login";
import { SignupForm } from "../pages/SignupForm";
import Notifications from "../pages/Notification";


const MainContent = () => {
  return (
    
    
      <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 min-h-screen no-scrollbar scroll-smooth flex flex-col items-center overflow-x-hidden">
        <div className="container mx-auto max-w-3xl">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fire" element={<Fire />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/share" element={<Share />} />
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
          <Footer />
        </div>
      </div>
    
  );
};

export default MainContent;
