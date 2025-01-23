import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import assets from "../assets/assets";

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [likes, setLikes] = useState([0, 0, 0]); // Manage like counts for each card
  const [liked, setLiked] = useState([false, false, false]); // Track like status

  const brands = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ];

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
      <div className="container mx-auto max-w-3xl ">
        <Navbar />
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-purple-100 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 leading-relaxed">
            Our Successful Projects
          </h2>

          <div
            className="overflow-x-auto px-4"
            style={{
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            <div className="flex gap-1 w-full">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(brand.name)}
                  className={`flex justify-center items-center w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                    selected === brand.name
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-8 h-8 md:w-14 md:h-14 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col gap-6 mt-6 w-full mb-32">
            {influencers.map((influencer, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[500px] mx-auto"
              >
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 text-center">
                  <div className="flex flex-row justify-between sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-semibold text-xl">{influencer.name}</h3>
                    <p className="text-sm text-gray-500">{influencer.brand}</p>
                  </div>

                  <div className="flex flex-row sm:flex-row sm:justify-evenly mt-4 gap-4">
                    {/* Like Button */}
                    <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-full w-52 sm:w-auto">
                      View Creator
                    </button>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => toggleLike(index)}
                        className="text-2xl cursor-pointer text-gray-500 hover:text-red-500"
                      >
                        <i
                          className={`fa${liked[index] ? "s" : "r"} fa-heart`}
                        />
                      </button>
                      <span className="ml-2 text-lg bg-red-500 text-white p-1 rounded-lg">
                        {likes[index]}k Likes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
