import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assets from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons"; // Importing the icons
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TrendingCards = () => {
  const [likedCards, setLikedCards] = useState({});

  const cards = [
    {
      id: 1,
      name: "Maren Workman",
      image: `${assets.people1}`,
      followers: {
        instagram: "4.2 Million",
        youtube: "3 Million",
        facebook: "4.4 Million",
      },
    },
    {
      id: 2,
      name: "John Doe",
      image: `${assets.people2}`,
      followers: {
        instagram: "1.8 Million",
        youtube: "2.1 Million",
        facebook: "3.2 Million",
      },
    },
    {
      id: 3,
      name: "Jane Smith",
      image: `${assets.people3}`,
      followers: {
        instagram: "5.0 Million",
        youtube: "3.8 Million",
        facebook: "4.9 Million",
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
    <div className="max-w-7xl mx-auto  px-4">
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

export default TrendingCards;
