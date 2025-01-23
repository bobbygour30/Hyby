import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assets from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TrendingCards = () => {
  const [likedCards, setLikedCards] = useState({});
  const [savedCards, setSavedCards] = useState({});
  const [selectedCards, setSelectedCards] = useState({});

  const cards = [
    {
      id: 1,
      name: "Maren Workman",
      image: `${assets.people1}`,
      followers: {
        instagram: "4.2 M",
        youtube: "3 M",
        facebook: "4.4 M",
      },
    },
    {
      id: 2,
      name: "John Doe",
      image: `${assets.people2}`,
      followers: {
        instagram: "1.8 M",
        youtube: "2.1 M",
        facebook: "3.2 M",
      },
    },
    {
      id: 3,
      name: "Jane Smith",
      image: `${assets.people3}`,
      followers: {
        instagram: "5.0 M",
        youtube: "3.8 M",
        facebook: "4.9 M",
      },
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 3 cards on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleLike = (id) => {
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id) => {
    setSavedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSelect = (id) => {
    setSelectedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <Slider {...sliderSettings}>
        {cards.map((card) => (
          <div key={card.id} className="p-2 md:p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative md:scale-100 sm:scale-90 sm:max-w-xs mx-auto transition-transform">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-40 md:h-64 object-cover sm:h-32"
              />
              {/* Like Icon */}
              <button
                onClick={() => toggleLike(card.id)}
                className="absolute top-2 right-2 text-red-500 text-xl sm:text-lg focus:outline-none"
              >
                <div className="px-1 bg-white rounded-lg shadow-md">
                  <FontAwesomeIcon
                    icon={likedCards[card.id] ? solidHeart : regularHeart}
                  />
                </div>
              </button>
              <div className="p-2 sm:p-1">
                <h3 className="text-[10px] font-bold text-center lg:text-lg">
                  {card.name}
                </h3>
                <div className="text-gray-600 text-center mt-2 sm:mt-1">
                  <p className="flex justify-center items-center gap-1">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-pink-500 text-sm lg:text-lg "
                    />
                    <span className="font-semibold text-pink-500 text-sm hidden sm:inline-block">
                      Instagram: {card.followers.instagram}
                    </span>
                    <span className="font-semibold text-pink-500 text-xs lg:text-lg sm:hidden">
                      {card.followers.instagram}
                    </span>
                  </p>
                  {/* YouTube */}
                  <p className="flex justify-center items-center gap-1">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="text-red-500 text-sm lg:text-lg"
                    />
                    <span className="font-semibold text-red-500 text-sm hidden sm:inline-block">
                      YouTube: {card.followers.youtube}
                    </span>
                    <span className="font-semibold text-red-500 text-xs lg:text-lg sm:hidden">
                      {card.followers.youtube}
                    </span>
                  </p>
                  {/* Facebook */}
                  <p className="flex justify-center items-center gap-1">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-blue-500 text-sm lg:text-lg"
                    />
                    <span className="font-semibold text-blue-500 text-sm hidden sm:inline-block">
                      Facebook: {card.followers.facebook}
                    </span>
                    <span className="font-semibold text-blue-500 text-xs lg:text-lg sm:hidden">
                      {card.followers.facebook}
                    </span>
                  </p>
                  <div className="flex flex-row justify-between mt-2 sm:mt-1">
                    <button
                      onClick={() => toggleSelect(card.id)}
                      className={`px-3 py-1 text-white font-semibold rounded-full transition-all 
    sm:text-lg sm:px-6 sm:py-2 sm:rounded-full 
    ${
      selectedCards[card.id]
        ? "bg-green-600"
        : "bg-green-400 hover:bg-green-500"
    } 
    shadow-md focus:outline-none focus:ring-2 focus:ring-green-300`}
                    >
                      {selectedCards[card.id] ? "Selected" : "Select"}
                    </button>

                    <button
                      onClick={() => toggleSave(card.id)}
                      className="text-yellow-500 text-sm lg:text-lg mr-1 focus:outline-none"
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={
                            savedCards[card.id]
                              ? solidBookmark
                              : regularBookmark
                          }
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4">
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm md:text-lg transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          See More
          <FontAwesomeIcon
            icon={faArrowRight}
            className="ml-1 text-lg md:text-xl"
          />
        </button>
      </div>
    </div>
  );
};

export default TrendingCards;
