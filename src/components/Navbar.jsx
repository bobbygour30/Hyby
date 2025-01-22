import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="container mx-auto max-w-4xl flex items-center justify-between p-4">
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search Best Influencer Or More"
            className="flex-grow outline-none text-gray-600 text-sm placeholder-gray-400"
          />
          <button className="text-yellow-500">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Icons Container */}
        <div className="flex items-center space-x-4 ml-2 lg:space-x-2">
          {/* Bookmark Icon */}
          <button onClick={toggleBookmark} className="text-yellow-500 text-xl">
            {isBookmarked ? (
              <i className="fas fa-bookmark"></i>
            ) : (
              <i className="far fa-bookmark"></i>
            )}
          </button>

          {/* Flame Icon */}
          <div className="flex items-center space-x-1 ">
            <Link to="/fire">
              <button>
                <i className="cursor-pointer fas fa-fire text-xl text-orange-500"></i>
              </button>
            </Link>

            <span className="text-gray-700 font-medium">10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
