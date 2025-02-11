import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaHome, FaEdit } from "react-icons/fa";

const SelectCreator = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const toggleLike = () => setLiked(!liked);
  const toggleSave = () => setSaved(!saved);
  const handleHomeClick = () => navigate("/influencer");
  const handleEditClick = () => navigate("/profileinfo");

  return (
    <div className="flex items-center justify-evenly gap-4">
      {/* Home Button */}
      <button
        onClick={handleHomeClick}
        className="text-2xl text-gray-800 focus:outline-none hover:text-blue-500 transition-colors"
      >
        <FaHome />
      </button>

      {/* Like and Save Buttons */}
      <div className="flex gap-4">
        <button
          onClick={toggleLike}
          className={`text-2xl focus:outline-none ${liked ? "text-red-500" : "text-gray-800"}`}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>

        <button
          onClick={toggleSave}
          className={`text-2xl focus:outline-none ${saved ? "text-yellow-500" : "text-gray-800"}`}
        >
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={handleEditClick}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-medium text-sm rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <FaEdit className="text-lg" />
        Edit
      </button>

      {/* Select Creator Button */}
      <button className="px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-full shadow-md hover:bg-blue-600 transition">
        Select Creator
      </button>
    </div>
  );
};

export default SelectCreator;
