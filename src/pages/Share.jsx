import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Share = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("Bobby878787");
    alert("Referral code copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Referral Code",
          text: "Use my referral code Bobby878787 to join!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  const referrals = [
    "Gaurav Sharma",
    "Bhupendra Sharma",
    "Ajay Chaudhary",
    "Rajesh Tiwari",
    "Abhishek Sharma",
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto  ">
        <Navbar />
        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 p-4 rounded-lg shadow-md w-full mx-auto ">
          {/* Manager and Inviter Info */}
          <div className="text-sm text-gray-700 mb-4">
            <p>
              <span className="font-bold text-yellow-600">Your Manager – </span>
              <span className="text-black font-semibold">Sagar (Hyby Connect)</span>
            </p>
            <p className="text-yellow-500">
              You Were Invited By{" "}
              <span className="text-gray-500">Divya Gupta</span>
            </p>
          </div>

          {/* Referral Code Section */}
          <div className="my-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
              Your Code
            </h2>
            <div className="flex flex-row  items-center justify-center bg-white rounded-md shadow-md mx-auto p-2 w-full sm:w-[60%] lg:w-[50%]">
              <input
                type="text"
                value="Bobby878787"
                readOnly
                className="text-xl font-semibold text-center border-none bg-transparent focus:outline-none mb-2 sm:mb-0 sm:mr-4"
              />
              <button
                onClick={handleCopy}
                className="p-2 text-green-500 hover:text-green-700"
              >
                <FontAwesomeIcon icon={faCopy} size="lg" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-blue-500 hover:text-blue-700 ml-2"
              >
                <FontAwesomeIcon icon={faShareAlt} size="lg" />
              </button>
            </div>
            <p className="text-sm text-center text-gray-500 mt-4">
              Refer To Your Friend Or Your Relative Via Your{" "}
              <span className="text-blue-500 font-semibold">Referral Code</span>{" "}
              <br />
              Earn <span className="font-bold">2.1%</span> Of Company Profit
              Made By Your Invited Friend
            </p>
          </div>

          {/* Total Fires Section */}
          <div className="mt-6 text-center">
            <p className="text-xl sm:text-2xl font-semibold">
              You Got Total{" "}
              <span className="text-2xl sm:text-3xl font-bold text-yellow-500">
                192k Fires
              </span>{" "}
              From Your Referrals.
            </p>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 p-4 rounded-lg shadow-md w-full mx-auto mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 text-center">
            Your Referrals (24)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {referrals.map((name, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200 text-center"
              >
                <p className="text-base sm:text-lg font-medium text-gray-700">
                  {name}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="text-blue-500 font-medium hover:underline">
              See All
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Share;
