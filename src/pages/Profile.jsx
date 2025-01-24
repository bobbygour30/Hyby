import React, { useState } from "react";
import Navbar from "../components/Navbar";
import assets from "../assets/assets";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import SelectCreator from "../components/SelectCreator";

const Profile = () => {
  const [likes, setLikes] = useState([0, 0, 0]); // Manage like counts for each card
  const [liked, setLiked] = useState([false, false, false]);

  const influencers = [
    {
      name: "John Doe",
      brand: "Apple",
      image: `${assets.influencer1}`,
    },
    {
      name: "Jane Smith",
      brand: "Google",
      image: `${assets.influencer2}`,
    },
    {
      name: "Alex Brown",
      brand: "Microsoft",
      image: `${assets.influencer3}`,
    },
  ];
  const toggleLike = (index) => {
    const newLiked = [...liked];
    const newLikes = [...likes];
    newLiked[index] = !newLiked[index];
    newLikes[index] = newLiked[index]
      ? newLikes[index] + 1
      : newLikes[index] - 1;
    setLiked(newLiked);
    setLikes(newLikes);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Navbar />
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-1">
            <div className="flex items-center justify-evenly">
              {/* Profile Picture */}
              <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden">
                <img
                  src={assets.people3}
                  alt="Jasmine"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Profile Info */}
              <div>
                <h2 className="mt-4 text-lg sm:text-2xl font-bold text-gray-800">
                  Jasmine (21)
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Delhi, India
                </p>

                {/* Category and Language */}
                <div className="mt-2 text-gray-500 text-sm sm:text-base">
                  <p>
                    <strong>Category:</strong> Fashion
                  </p>
                  <p>
                    <strong>Language:</strong> English
                  </p>
                  <p className="text-red-500">
                    Total Projects:{" "}
                    <span className="text-red-500 font-semibold">112</span>
                  </p>
                  <div className="flex gap-4 sm:gap-10">
                    <p className="text-yellow-500">Earned: 🔥 2.8M</p>
                    <p className="text-red-500">Likes: ❤️ 37k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Stats */}
            <div className="mt-4 flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="flex flex-row gap-2 items-center shadow-md p-1 sm:p-2 rounded-lg">
                <FaInstagram className="text-pink-500 text-xl sm:text-2xl" />
                <p className="hidden sm:block text-sm text-pink-500">
                  Instagram
                </p>
                <p className="text-pink-500 font-semibold text-xs sm:text-sm">
                  4.2M
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center shadow-md p-1 sm:p-2 rounded-lg">
                <FaYoutube className="text-red-500 text-xl sm:text-2xl" />
                <p className="hidden sm:block text-sm text-red-500">YouTube</p>
                <p className="text-red-500 font-semibold text-xs sm:text-sm">
                  3M
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center shadow-md p-1 sm:p-2 rounded-lg">
                <FaFacebook className="text-blue-700 text-xl sm:text-2xl" />
                <p className="hidden sm:block text-sm text-blue-700">
                  Facebook
                </p>

                <p className="text-blue-700 font-semibold text-xs sm:text-sm">
                  4.4M
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 rounded-lg shadow-md ">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mt-2 text-gray-600">
            Recent Projects & Campaigns
          </h3>
          <div className="flex flex-col gap-6 mt-6 w-full mb-32">
            {influencers.map((influencer, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[500px] mx-auto relative"
              >
                {/* Image */}
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Content */}
                <div className="mt-4 text-center mr-28">
                  <div className="flex flex-row items-center justify-evenly sm:flex-row sm:justify-evenly sm:items-center">
                    <h3 className="font-semibold text-xl">{influencer.name}</h3>
                    <p className="text-sm text-gray-500">{influencer.brand}</p>
                  </div>
                </div>

                {/* Red Button */}
                <span className="absolute bottom-4  right-4 text-sm sm:text-lg bg-red-500 text-white px-3 py-1 rounded-full rounded-tl-none shadow-md">
                  10k Likes
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 w-full rounded-lg bg-purple-100 p-4 shadow-md max-w-3xl mx-auto">
          <SelectCreator />
        </div>
      </div>
    </>
  );
};

export default Profile;
