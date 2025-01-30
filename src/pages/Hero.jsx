import React from "react";
// import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="absolute bg-gradient-to-b from-purple-100 via-white to-purple-100 z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <div className="mt-8 w-full px-4 md:px-8 lg:px-16">
          {/* Interactive container for buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8 pointer-events-auto">
            {/* Influencer Button */}
            <Link to="/influencer">
              <button className="cursor-pointer w-full md:w-64 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition duration-300 ease-in-out">
                An Influencer
              </button>
            </Link>

            {/* Digital Services Button */}
            <Link to="/digital-services">
              <button className="cursor-pointer w-full md:w-80 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold text-lg rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 hover:scale-105 transition duration-300 ease-in-out">
                Explore Digital Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
