import { useState } from "react";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import assets from "../assets/assets";
import { Button } from "../components/Button";

export function SignupForm() {
  const [userType, setUserType] = useState("influencer"); // "brand" or "influencer"
  const [formData, setFormData] = useState({
    brandName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    aboutCompany: "",
    category: "",
    gstCin: "",
    instagramUsername: "",
    youtubeLink: "",
    facebookLink: "",
  });
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      userType,
      whatsappNotifications,
    };

    setIsLoading(true);
    try {
      const response = await fetch("http://75.119.146.185:4444/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0 h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto p-6 rounded-3xl text-white">
        <div className="flex items-center justify-center mb-6">
          <div className="flex rounded-full bg-gray-800 p-1">
            <button
              className={`px-4 py-2 rounded-full ${
                userType === "brand"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setUserType("brand")}
            >
              Brand
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                userType === "influencer"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setUserType("influencer")}
            >
              Influencer
            </button>
          </div>
        </div>

        {/* Brand Form */}
        {userType === "brand" && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label htmlFor="brandName" className="block mb-2 text-sm font-medium">
                Brand Name
              </label>
              <input
                id="brandName"
                name="brandName"
                type="text"
                placeholder="Nykaa"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.brandName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
                Your Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Abhishek Sharma"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Abhishek99Sharma@Gmail.Com"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="flex bg-gray-200 border text-black border-gray-700 rounded-full items-center px-3 w-20">
                  <img src={assets.Flag} alt="IN" className="mr-1 w-4 h-4" />
                  <span>+91</span>
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="80 766 12345"
                  className="flex-1 p-2 rounded-full bg-gray-200 text-black"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="aboutCompany" className="block mb-2 text-sm font-medium">
                About Your Company
              </label>
              <textarea
                id="aboutCompany"
                name="aboutCompany"
                placeholder="Write about your company here..."
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.aboutCompany}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Beauty"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="gstCin" className="block mb-2 text-sm font-medium">
                GST, CIN Number or License
              </label>
              <input
                id="gstCin"
                name="gstCin"
                type="text"
                placeholder="29ABCDE1234F1Z5"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.gstCin}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Submit"}
            </Button>
          </form>
        )}

        {/* Influencer Form */}
        {userType === "influencer" && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
                Your Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jasmine Bhandari"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="instagramUsername" className="block mb-2 text-sm font-medium">
                Instagram Username
              </label>
              <input
                id="instagramUsername"
                name="instagramUsername"
                type="text"
                placeholder="Jasmine_bhandari_4567"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.instagramUsername}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="youtubeLink" className="block mb-2 text-sm font-medium">
                Youtube Link
              </label>
              <input
                id="youtubeLink"
                name="youtubeLink"
                type="url"
                placeholder="www.youtube.com/@jasmine123bhand..."
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.youtubeLink}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="facebookLink" className="block mb-2 text-sm font-medium">
                Facebook Link
              </label>
              <input
                id="facebookLink"
                name="facebookLink"
                type="url"
                placeholder="www.facebook.com/@jasmine3546bh..."
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.facebookLink}
                onChange={handleInputChange}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-white py-2"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
