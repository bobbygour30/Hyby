import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Fire = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Navbar />
      </div>
      <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 container mx-auto max-w-3xl px-6 py-12 min-h-screen flex flex-col items-center">
        {/* Reward Section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 leading-relaxed">
          You Have <span className="text-orange-500">10</span> Free Fires By
          More.
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex flex-col items-center bg-gradient-to-br from-orange-300 to-red-400 rounded-xl shadow-lg p-4 md:p-6 text-white w-28 sm:w-32 md:w-48 hover:scale-105 transition-transform duration-300">
            <span className="font-medium text-xs bg-orange-500 rounded-full px-3 py-1 mb-2 md:mb-3">
              Withdraw
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold">10K 🔥</h2>
            <p className="text-xs md:text-sm mt-1 md:mt-2">You will get 10,000 ₹</p>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-orange-300 to-red-400 rounded-xl shadow-lg p-4 md:p-6 text-white w-28 sm:w-32 md:w-48 hover:scale-105 transition-transform duration-300">
            <span className="font-medium text-xs bg-orange-500 rounded-full px-3 py-1 mb-2 md:mb-3">
              Withdraw
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold">20K 🔥</h2>
            <p className="text-xs md:text-sm mt-1 md:mt-2">You will get 20,000 ₹</p>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-orange-300 to-red-400 rounded-xl shadow-lg p-4 md:p-6 text-white w-28 sm:w-32 md:w-48 hover:scale-105 transition-transform duration-300">
            <span className="font-medium text-xs bg-orange-500 rounded-full px-3 py-1 mb-2 md:mb-3">
              Withdraw
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold">50K 🔥</h2>
            <p className="text-xs md:text-sm mt-1 md:mt-2">You will get 50,000 ₹</p>
          </div>
        </div>

        {/* What Is Fire Section */}
        <div className="text-center mt-10 sm:mt-12 px-4 md:px-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            What Is Fire? 🔥
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Introducing Fire! Welcome to Fire, our exclusive in-app currency
            designed to enhance your experience on our platform!
            <strong> 1 Fire is equal to 1 Rupee (₹)</strong>, and it’s used to
            access premium features.
          </p>
          <ul className="text-gray-700 text-left list-disc pl-6 space-y-3">
            <li>
              <strong>View influencer profiles:</strong> Each profile visit
              costs 1 Fire, giving you access to valuable content and insights
              from your favorite influencers.
            </li>
            <li>
              <strong>Manage your transactions:</strong> Fire is the simple,
              transparent way to make your experience even better.
            </li>
            <li>
              <strong>Withdraw Fire:</strong> You can withdraw Fire as Indian
              rupees in your bank account — 10K to 50K at once.
            </li>
          </ul>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mt-6">
            Buy more Fire and unlock new ways to connect with influencers and
            discover exclusive content on our platform!
          </p>
        </div>

        {/* Pricing Section */}
        <div className="text-center mt-10 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Buy Fire 🔥
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-8">
            Get more Fire at discounted prices!
          </p>
          <div className="flex flex-col gap-4 w-full mb-16">
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-lg hover:bg-gray-200 transition-colors duration-300 min-w-[200px]">
              <span className="flex items-center text-gray-800 font-medium">
                <span role="img" aria-label="fire">
                  🔥
                </span>{" "}
                Get 100 Fire
              </span>
              <span className="text-green-600 font-bold">₹99</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-lg hover:bg-gray-200 transition-colors duration-300 min-w-[200px]">
              <span className="flex items-center text-gray-800 font-medium">
                <span role="img" aria-label="fire">
                  🔥
                </span>{" "}
                Get 200 Fire
              </span>
              <span className="text-green-600 font-bold">₹199</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-lg hover:bg-gray-200 transition-colors duration-300 min-w-[200px]">
              <span className="flex items-center text-gray-800 font-medium">
                <span role="img" aria-label="fire">
                  🔥
                </span>{" "}
                Get 500 Fire
              </span>
              <span className="text-green-600 font-bold">₹449</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-lg hover:bg-gray-200 transition-colors duration-300 min-w-[200px]">
              <span className="flex items-center text-gray-800 font-medium">
                <span role="img" aria-label="fire">
                  🔥
                </span>{" "}
                Get 1100 Fire
              </span>
              <span className="text-green-600 font-bold">₹999</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl">
        <Footer />
      </div>
    </>
  );
};

export default Fire;
