import { useState } from "react";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import assets from "../assets/assets";
import { Button } from "../components/Button";

export function SignupForm() {
  const [userType, setUserType] = useState("influencer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "",
    language: "",
    instagramUsername: "",
    youtubeLink: "",
    facebookLink: "",
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (e.target.nextSibling && value !== "") {
      e.target.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      otp: otp.join(""),
      userType,
      whatsappNotifications,
    });
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0 h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto p-6 rounded-3xl text-white">
        <div className="flex items-center justify-end mb-6">
          <div className="flex rounded-full bg-gray-800 p-1">
            <button
              className={`px-4 py-2 rounded-full ${
                userType === "brand"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setUserType("brand")}
            >
              Brand
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                userType === "influencer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setUserType("influencer")}
            >
              Influencer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium"
            >
              Your Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Jasmine Bhandari"
              className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Jasmine.98@Gmail.Com"
              className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium"
            >
              Mobile Number
            </label>
            <div className="flex gap-2 sm:gap-1">
              <div className="flex bg-gray-200 border text-black border-gray-700 rounded-full items-center px-3 w-20">
                <img src={assets.Flag} alt="IN" className="mr-1 w-4 h-4" />
                <span>+91</span>
              </div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="80 766 12345"
                className="flex-1 p-2 sm:p-1 rounded-full bg-gray-200 text-black"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-1 mt-2">
              <span className="text-sm">Get Notifications On Your</span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-green-400">Whatsapp</span>
                <input
                  type="checkbox"
                  checked={whatsappNotifications}
                  onChange={() =>
                    setWhatsappNotifications(!whatsappNotifications)
                  }
                  className="w-5 h-5 rounded-full bg-gray-800 border-gray-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">OTP</label>
            <div className="flex gap-2 justify-between sm:gap-1">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, idx)}
                  className="w-10 h-10 text-center p-2 sm:p-1 rounded-full bg-gray-200 text-black"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 sm:gap-2">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="language"
                className="block mb-2 text-sm font-medium"
              >
                Language
              </label>
              <select
                id="language"
                name="language"
                className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, language: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="instagramUsername"
              className="block mb-2 text-sm font-medium"
            >
              Instagram Username
            </label>
            <input
              id="instagramUsername"
              name="instagramUsername"
              type="text"
              placeholder="Jasmine_bhandari_4567"
              className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
              value={formData.instagramUsername}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="youtubeLink"
              className="block mb-2 text-sm font-medium"
            >
              Youtube Link
            </label>
            <input
              id="youtubeLink"
              name="youtubeLink"
              type="url"
              placeholder="www.youtube.com/@jasmine123bhand..."
              className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
              value={formData.youtubeLink}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="facebookLink"
              className="block mb-2 text-sm font-medium"
            >
              Facebook Link
            </label>
            <input
              id="facebookLink"
              name="facebookLink"
              type="url"
              placeholder="www.facebook.com/@jasmine3546bh..."
              className="w-full p-2 sm:p-1 rounded-full bg-gray-200 text-black"
              value={formData.facebookLink}
              onChange={handleInputChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-2 sm:py-2"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
