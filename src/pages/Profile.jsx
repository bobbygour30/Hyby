import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebook, FaSignOutAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import SelectCreator from "../components/SelectCreator";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("access_token");// Retrieve token
  
    if (!isAuthenticated || !token) {
      navigate("/login", { replace: true });
      return;
    }
  
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://75.119.146.185:4444/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token
          },
        });
  
        if (!response.ok) throw new Error("Failed to fetch user data");
  
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) return <div className="text-center py-10">User data not found</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <Navbar />
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-1">
        <div className="flex items-center justify-evenly">
          <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <img src={user.profile_pic || "/placeholder.svg"} alt={user.name} className="object-cover w-full h-full" />
          </div>
          <div>
            <h2 className="mt-4 text-lg sm:text-2xl font-bold text-gray-800">{user.name} ({user.age})</h2>
            <p className="text-gray-600 text-sm sm:text-base">{user.location}</p>
            <p><strong>Category:</strong> {user.category}</p>
            <p><strong>Language:</strong> {user.language}</p>
            <p className="text-red-500">Total Projects: <span className="font-semibold">{user.total_projects}</span></p>
            <div className="flex gap-4 sm:gap-10">
              <p className="text-yellow-500">Earned: 🔥 {user.earnings}</p>
              <p className="text-red-500">Likes: ❤️ {user.likes}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-4 sm:space-x-6">
          {user.social_media && (
            <>
              <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
                <FaInstagram className="text-pink-500 text-xl" />
                <p className="text-pink-500 font-semibold">{user.social_media.instagram}</p>
              </div>
              <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
                <FaYoutube className="text-red-500 text-xl" />
                <p className="text-red-500 font-semibold">{user.social_media.youtube}</p>
              </div>
              <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
                <FaFacebook className="text-blue-700 text-xl" />
                <p className="text-blue-700 font-semibold">{user.social_media.facebook}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 rounded-lg shadow-md p-4">
        <h3 className="text-2xl font-semibold text-center text-gray-600">Recent Projects & Campaigns</h3>
        <div className="flex flex-col gap-6 mt-6 w-full mb-32">
          {user.projects.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg max-w-[500px] mx-auto relative">
              <img src={project.image} alt={project.name} className="w-full h-64 object-cover rounded-lg" />
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-xl">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.brand}</p>
              </div>
              <span className="absolute bottom-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded-full shadow-md">{project.likes} Likes</span>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-purple-100 p-4 shadow-md max-w-5xl mx-auto">
        <SelectCreator />
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors flex items-center justify-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
