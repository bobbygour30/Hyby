import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found! Redirecting to login.");
        navigate("/login");
        return;
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
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDeleteImage = () => {
    setUser((prev) => ({
      ...prev,
      profile_pic: "", // Removing the profile picture
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({
        ...prev,
        profile_pic: imageUrl,
      }));
    }
  };
  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field], // Toggle the edit mode for the specific field
    }));
  };
  

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access_token");

    const updatedData = {
      name: user.name,
      profile_pic: user.profile_pic,
      social_media: user.social_media,
    };

    try {
      const response = await fetch("http://75.119.146.185:4444/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser); // Update state with new data
      navigate("/profile", { replace: true }); // Navigate without reloading
    } catch (error) {
      console.error(error);
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
                <h2 className="text-lg font-medium mb-4">Social Media</h2>
                <div className="space-y-4">
                  {Object.entries(user.social_media || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        <label className="block mb-2 font-medium capitalize">
                          {key}
                        </label>
                        <div className="relative">
                          <input
                            name={key}
                            value={value || ""}
                            onChange={(e) =>
                              setUser((prev) => ({
                                ...prev,
                                social_media: {
                                  ...prev.social_media,
                                  [key]: e.target.value,
                                },
                              }))
                            }
                            className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-yellow-500"
                          />
                          <button
                            type="button"
                            onClick={() => toggleEditMode(key)}
                            className="absolute right-3 top-2.5 text-green-500 hover:text-green-600"
                          >
                            {editMode[key] ? (
                              <span className="text-sm">Save</span>
                            ) : (
                              <Edit2 className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-gray-50 rounded-b-lg">
              <button
                type="button"
                onClick={() => setEditMode({})}
                className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                disabled={loading}
              >
                Cancel
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
