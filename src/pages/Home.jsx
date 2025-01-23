import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import assets from "../assets/assets";
import TrendingCrads from "../components/TrendingCards";
import ForYou from "../components/ForYou";
import Platform from "../components/Platform";
import Category from "../components/Category";

const Home = () => {
  const [selected, setSelected] = useState(null);
  

  const languages = [
    { name: "Hindi", nativeName: "हिन्दी" },
    { name: "English", nativeName: "English" },
    { name: "Marathi", nativeName: "मराठी" },
    { name: "Bhojpuri", nativeName: "भोजपुरी" },
    { name: "Kannad", nativeName: "ಕನ್ನಡ" },
    { name: "Haryanvi", nativeName: "ਹਰਿਆਣਵੀ" },
    { name: "Telugu", nativeName: "తెలుగు" },
    { name: "Other", nativeName: "Other" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div>
      <div className="flex justify-center bg-gradient-to-b from-gray-100 to-purple-100">
        <div
          className="overflow-x-auto"
          style={{
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none", // Firefox
          }}
        >
          <div className="flex gap-4 p-4 w-full">
            {languages.map((lang, index) => (
              <div
                key={index}
                onClick={() => setSelected(lang.name)}
                className={`flex justify-center p-2 items-center w-16 h-12 md:w-20 md:h-20 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                  selected === lang.name
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <span className="text-xs sm:text-sm md:text-lg font-semibold">
                  {lang.nativeName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="p-4 bg-gradient-to-b from-gray-100 to-purple-100">
        <h1 className="text-3xl text-center font-semibold">
          Popular Influencer
        </h1>

        {/* Slider Section */}
        <div className=" max-w-2xl mx-auto">
          <style>
            {`
              .slick-dots {
                bottom: -10px; /* Decrease this value to bring dots closer */
              }
              .slick-dots li button:before {
                color: #6b46c1; /* Custom color for the dots */
              }
            `}
          </style>
          <Slider {...sliderSettings}>
            {/* Slide 1 */}
            <div className="p-4 flex justify-center bg-gradient-b to-purple-100">
              <img
                src={assets.influencer1}
                className="w-full rounded-lg text-center"
                alt="Influencer 1"
              />
            </div>
            {/* Slide 2 */}
            <div className="p-4 flex justify-center">
              <img
                src={assets.influencer1}
                className="w-full rounded-lg"
                alt="Influencer 2"
              />
            </div>
            {/* Slide 3 */}
            <div className="p-4 flex justify-center">
              <img
                src={assets.influencer3}
                className="w-full rounded-lg"
                alt="Influencer 3"
              />
            </div>
          </Slider>
        </div>
      </section>
      <div className=" bg-gradient-to-b from-gray-100 to mb-40">
        <h1 className="text-3xl text-center font-semibold mt-4">Trending</h1>
        <TrendingCrads />
        <ForYou />
        <Platform />
        <Category />
      </div>
    </div>
  );
};

export default Home;
