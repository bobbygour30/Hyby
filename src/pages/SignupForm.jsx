import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import assets from "../assets/assets";
import { Button } from "../components/Button";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("influencer");
  const [formData, setFormData] = useState({
    brandName: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    aboutCompany: "",
    category: "",
    gstCin: "",
    youtubeLink: "",
    facebookLink: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomUserId = Math.floor(Math.random() * 1000) + 1;
    const randomReferredBy = Math.floor(Math.random() * 1000) + 1;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      user_id: randomUserId,
      username: userType === "brand" ? formData.brandName : formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      social_media:
        userType === "influencer"
          ? {
              youtube: formData.youtubeLink,
              facebook: formData.facebookLink,
            }
          : {},
      referred_by: randomReferredBy,
      status: false,
    };

    console.log(payload);

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
        const errorData = await response.json();
        throw new Error(errorData?.detail || "Failed to submit the form.");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      alert("Signup successful!");
      navigate("/login");

      setFormData({
        brandName: "",
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        aboutCompany: "",
        category: "",
        gstCin: "",
        youtubeLink: "",
        facebookLink: "",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(error.message || "Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-purple-100 via-white to-purple-100">
      {/* <BackgroundGradientAnimation containerClassName="absolute inset-0 z-0 h-full" /> */}

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

        {userType === "brand" && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label
                htmlFor="brandName"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@domain.com"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-black"
              >
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="flex bg-gray-200 text-black  rounded-full items-center px-3 w-20">
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
              <label
                htmlFor="aboutCompany"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="gstCin"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-black"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@domain.com"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-black"
              >
                Mobile Number
              </label>
              <input
                id="phone"
                name="phone" // ✅ Matches `formData.phone`
                type="tel"
                placeholder="80 766 12345"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.phone} // ✅ Matches the state variable
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisibility.password ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2 rounded-full bg-gray-200 text-black"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="absolute right-3 top-2 cursor-pointer text-black"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {passwordVisibility.password ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-black"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  className="w-full p-2 rounded-full bg-gray-200 text-black"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="absolute right-3 top-2 cursor-pointer text-black"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="youtubeLink"
                className="block mb-2 text-sm font-medium text-black"
              >
                YouTube Channel URL
              </label>
              <input
                id="youtubeLink"
                name="youtubeLink"
                type="url"
                placeholder="https://youtube.com/channel/xyz"
                className="w-full p-2 rounded-full bg-gray-200 text-black"
                value={formData.youtubeLink}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="facebookLink"
                className="block mb-2 text-sm font-medium text-black"
              >
                Facebook Profile/Business Page URL
              </label>
              <input
                id="facebookLink"
                name="facebookLink"
                type="url"
                placeholder="https://facebook.com/yourname"
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
              {isLoading ? "Signing Up..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
