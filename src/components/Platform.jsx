import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assets from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Importing faArrowRight
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Platform = () => {
  const [likedCards, setLikedCards] = useState({});
  const [activeCategory, setActiveCategory] = useState("YouTube");

  const platformColors = {
    YouTube: "bg-red-500 text-white",
    Instagram: "bg-pink-500 text-white",
    Facebook: "bg-blue-500 text-white",
    Twitter: "bg-sky-500 text-white",
    LinkedIn: "bg-blue-700 text-white",
  };

  const categorie = ["YouTube", "Instagram", "Facebook", "Twitter", "LinkedIn"];

  const cards = [
    {
      id: 1,
      name: "Alice Johnson",
      image: `${assets.people1}`,
      followers: {
        instagram: "2.5 Million",
        youtube: "1.2 Million",
        facebook: "3.1 Million",
      },
    },
    {
      id: 2,
      name: "Bob Brown",
      image: `${assets.people2}`,
      followers: {
        instagram: "3.3 Million",
        youtube: "2.5 Million",
        facebook: "4.0 Million",
      },
    },
    {
      id: 3,
      name: "Charlie Davis",
      image: `${assets.people3}`,
      followers: {
        instagram: "4.1 Million",
        youtube: "3.7 Million",
        facebook: "5.2 Million",
      },
    },
    {
      id: 4,
      name: "Eve Wilson",
      image: `${assets.people1}`,
      followers: {
        instagram: "2.0 Million",
        youtube: "1.5 Million",
        facebook: "3.5 Million",
      },
    },
    {
      id: 5,
      name: "Frank Thompson",
      image: `${assets.people2}`,
      followers: {
        instagram: "1.8 Million",
        youtube: "2.2 Million",
        facebook: "3.9 Million",
      },
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggleLike = (id) => {
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl text-center font-semibold mt-4">Platform</h1>
      <div className="overflow-x-auto flex items-center justify-center mt-4 mb-4">
        <div className="flex gap-2 w-full lg:justify-center">
          {categorie.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === category
                  ? platformColors[category]
                  : "bg-gray-300 text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <Slider {...sliderSettings}>
        {cards.map((card) => (
          <div key={card.id} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => toggleLike(card.id)}
                className="absolute top-4 right-4 text-red-500 text-2xl focus:outline-none"
              >
                <div className="px-2 bg-white rounded-lg shadow-lg">
                  <FontAwesomeIcon
                    icon={likedCards[card.id] ? regularHeart : solidHeart}
                  />
                </div>
              </button>
              <div className="p-4">
                <h3 className="text-xl font-bold text-center">{card.name}</h3>
                <div className="text-gray-600 text-center mt-3">
                  <p>
                    <span className="font-semibold text-pink-500">
                      <FontAwesomeIcon icon={faInstagram} className="mr-2" />{" "}
                      Instagram: {card.followers.instagram}
                    </span>{" "}
                  </p>
                  <p>
                    <span className="font-semibold text-red-500">
                      <FontAwesomeIcon icon={faYoutube} className="mr-2" />{" "}
                      YouTube: {card.followers.youtube}
                    </span>{" "}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-500">
                      <FontAwesomeIcon icon={faFacebook} className="mr-2" />{" "}
                      Facebook: {card.followers.facebook}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4">
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          See More
          <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Platform;
