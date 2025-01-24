import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

const SelectCreator = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="flex items-center justify-evenly gap-4">
      {/* Like Button */}
      <div className="flex gap-4">
        <button
          onClick={toggleLike}
          className={`text-2xl focus:outline-none ${
            liked ? "text-red-500" : "text-gray-800"
          }`}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Save Button */}
        <button
          onClick={toggleSave}
          className={`text-2xl focus:outline-none ${
            saved ? "text-yellow-500" : "text-gray-800"
          }`}
        >
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Select Creator Button */}
      <button className="px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-full shadow-md hover:bg-blue-600 transition">
        Select Creator
      </button>
    </div>
  );
};

export default SelectCreator;
