import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-100 via-white to-purple-100 text-center px-4">
      {/* Upper Section Background */}
      <div className="w-3/4 md:w-1/2 lg:w-1/3 h-48 md:h-64 lg:h-96 rounded-full flex items-center justify-center">
        <img
          src={assets.hero} // Replace with your background image path
          alt="Background"
          className="w-full h-full object-cover opacity-50 rounded-full"
        />
      </div>

      {/* Logo and Tagline */}
      <div className="mt-8 w-full px-4 md:px-8 lg:px-16">
        <img
          src={assets.logo} // Replace with your logo path
          alt="HYBY Logo"
          className="w-36 md:w-44 lg:w-52 h-auto mx-auto object-cover"
        />
        <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-4">
          Influencer, Digital Services and Marketing more.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 w-full px-4 md:px-8 lg:px-16">
        <p className="text-base md:text-lg lg:text-xl font-semibold">
          Welcome, You are...
        </p>
        <div className="flex flex-col gap-1 md:space-x-4 items-center mt-4">
          <Link to="/influencer">
            <button className="w-full md:w-64 px-3 py-3 pr-5 pl-5 md:p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-200">
              An Influencer
            </button>
          </Link>
          <Link>
            <button className="w-full md:w-[400px] p-3 mt-4 md:mt-0 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-200">
              Digital Services and Marketing and More.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
