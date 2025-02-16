import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";

const categories = [
  "Technology",
  "Education",
  "Entertainment",
  "Business",
  "Other",
];
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

const ProfileInfo = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    profile_pic: "",
    categories: [],
    languages: [],
    social_media: {},
    referred_by: "",
  });

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    return expirationTime > Date.now();
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://75.119.146.185:4444/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return data.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      navigate("/login");
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found! Redirecting to login.");
      navigate("/login");
      return;
    }

    if (!checkTokenExpiration()) {
      const newToken = await refreshToken();
      if (!newToken) return;
    }

    try {
      const response = await fetch("http://75.119.146.185:4444/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized! Token may be invalid or expired.");
        localStorage.removeItem("access_token");
        navigate("/login");
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser({
        ...data,
        categories: Array.isArray(data.categories) ? data.categories : [],
        languages: Array.isArray(data.languages) ? data.languages : [],
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleDeleteImage = () => {
    setUser((prev) => ({
      ...prev,
      profile_pic: "",
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; 
        localStorage.setItem("profile_pic", base64String);
        setUser((prev) => ({ ...prev, profile_pic: base64String }));
      };
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };


  useEffect(() => {
    const savedPic = localStorage.getItem("profile_pic");
    if (savedPic) {
      setUser((prev) => ({ ...prev, profile_pic: savedPic }));
    }
  }, []);

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updateUserData = async () => {
    let token = localStorage.getItem("access_token");

    if (!checkTokenExpiration()) {
      const newToken = await refreshToken();
      if (!newToken) return;
      token = newToken;
    }

    try {
      const response = await fetch("http://75.119.146.185:4444/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          social_media: user.social_media,
          referred_by: user.referred_by,
          languages: user.languages,
          categories: user.categories,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user data");

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let token = localStorage.getItem("access_token");
  
    if (!checkTokenExpiration()) {
      const newToken = await refreshToken();
      if (!newToken) return;
      token = newToken;
    }
  
    const dataToSend = {
      name: user.name,
      social_media: user.social_media || {},
      social_media_verified: true,
      referred_by: user.referred_by || "",
      languages: user.languages || [],
      categories: user.categories || [],
    };
  
   
    if (user.profile_pic) {
      dataToSend.profile_pic = user.profile_pic; 
    }
  
    try {
      const response = await fetch("http://75.119.146.185:4444/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) throw new Error("Failed to update profile");
  
      const updatedUser = await response.json();
      setUser(updatedUser);
      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      setEditMode({});
    }
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-center text-2xl font-semibold text-yellow-500 mb-8">
          Your Profile
        </h1>

        <div className="bg-gradient-to-b from-purple-100 via-white to-purple-200 rounded-lg shadow-lg">
          <form onSubmit={onSubmit}>
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-medium mb-6">Basic Info</h2>

              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-yellow-500">
                  <img
                    src={user.profile_pic || "/placeholder.svg"}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -right-2 top-0 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="rounded-full bg-yellow-500 text-white hover:bg-yellow-600 p-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="rounded-full bg-yellow-500 text-white hover:bg-yellow-600 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { id: "name", label: "Full Name", value: user.name },
                  { id: "phone", label: "Mobile Number", value: user.phone },
                  { id: "email", label: "Your Email", value: user.email },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block mb-2 font-medium"
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        name={field.id}
                        type="text"
                        value={user[field.id] || ""}
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            [field.id]: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        readOnly={!editMode[field.id]}
                      />
                      <button
                        type="button"
                        onClick={() => toggleEditMode(field.id)}
                        className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                      >
                        {editMode[field.id] ? (
                          <span className="text-sm">Save</span>
                        ) : (
                          <Edit2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <h2 className="text-lg font-medium mb-4">Categories</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Categories</label>
                    <div className="relative">
                      <select
                        name="categories"
                        value={user.categories?.[0] || ""}
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            categories: [e.target.value],
                          }))
                        }
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => toggleEditMode("categories")}
                        className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                      >
                        {editMode["categories"] ? (
                          <span className="text-sm">Save</span>
                        ) : (
                          <Edit2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Languages</label>
                    <div className="relative">
                      <select
                        name="languages"
                        value={user.languages?.[0] || ""}
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            languages: [e.target.value],
                          }))
                        }
                      >
                        <option value="">Select a language</option>
                        {languages.map((language) => (
                          <option key={language.name} value={language.name}>
                            {language.name} ({language.nativeName})
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => toggleEditMode("languages")}
                        className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                      >
                        {editMode["languages"] ? (
                          <span className="text-sm">Save</span>
                        ) : (
                          <Edit2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h2 className="text-lg font-medium mb-4">Social Media</h2>
                <div className="space-y-4">
                  {[
                    {
                      id: "youtube",
                      label: "YouTube",
                      placeholder: "https://www.youtube.com/yourchannel",
                    },
                    {
                      id: "instagram",
                      label: "Instagram",
                      placeholder: "https://www.instagram.com/yourusername",
                    },
                    {
                      id: "facebook",
                      label: "Facebook",
                      placeholder: "https://www.facebook.com/yourprofile",
                    },
                  ].map((social) => (
                    <div key={social.id}>
                      <label className="block mb-2 font-medium">
                        {social.label}
                      </label>
                      <div className="relative">
                        <input
                          name={social.id}
                          value={user.social_media?.[social.id] || ""}
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              social_media: {
                                ...prev.social_media,
                                [social.id]: e.target.value,
                              },
                            }))
                          }
                          placeholder={social.placeholder}
                          className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-500"
                        />
                        <button
                          type="button"
                          onClick={() => toggleEditMode(social.id)}
                          className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                        >
                          {editMode[social.id] ? (
                            <span className="text-sm">Save</span>
                          ) : (
                            <Edit2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateUserData}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Update User Data
              </button>

              <button
                type="submit"
                className="flex-1 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;