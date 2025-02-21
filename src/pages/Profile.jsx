import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState(state?.user || null);
  const [loading, setLoading] = useState(!user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) return;

    const token = Cookies.get("access_token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://75.119.146.185:4444/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized! Token may be expired or invalid.");
          Cookies.remove("access_token");
          navigate("/login");
          return;
        }

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
  }, [navigate, user]);

  const handleLogout = () => {
    logout();
    Cookies.remove("access_token");
    navigate("/login");
  };

  const handleEditClick = () => navigate("/profileinfo");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user)
    return <div className="text-center py-10">User data not found</div>;

  return (
    <div className="relative max-w-5xl mx-auto">
      <Navbar />
      {/* Overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-1 relative">
        <div className="flex items-center justify-evenly">
          <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <img
              src={user.profile_pic || "/placeholder.svg"}
              alt={user.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="mt-4 text-lg sm:text-2xl font-bold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {user.location}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {user.categories?.join(", ") || "Not specified"}
            </p>
            <p>
              <strong>Language:</strong>{" "}
              {user.languages?.join(", ") || "Not specified"}
            </p>
            <p className="text-red-500">
              Total Projects:{" "}
              <span className="font-semibold">{user.total_projects}</span>
            </p>
            <div className="flex gap-4 sm:gap-10">
              <p className="text-yellow-500">Earned: 🔥 {user.earnings}</p>
              <p className="text-red-500">Likes: ❤️ {user.likes}</p>
            </div>
          </div>
        </div>
        <button className="absolute top-4 right-4" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faCog} className="text-gray-600 text-lg" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-[calc(100vh-64px)] bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar} // Clicking outside closes the sidebar
      >
        <div
          className="absolute top-0 right-0 h-full w-72 bg-white bg-opacity-90 shadow-lg p-6 rounded-l-lg transition-transform duration-300 ease-in-out transform"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
        >
          <button
            className="absolute top-4 right-4 text-gray-600 text-xl"
            onClick={toggleSidebar}
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Settings
          </h2>
          <ul className="space-y-4">
            <li
              onClick={handleEditClick}
              className="py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition"
            >
              Edit Profile
            </li>
            <li
              className="py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer transition"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4 sm:space-x-6">
        {user.social_media && (
          <>
            <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
              <FaInstagram className="text-pink-500 text-xl" />
              <p className="text-pink-500 font-semibold">
                {user.social_media.instagram}
              </p>
            </div>
            <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
              <FaYoutube className="text-red-500 text-xl" />
              <p className="text-red-500 font-semibold">
                {user.social_media.youtube}
              </p>
            </div>
            <div className="flex gap-2 items-center shadow-md p-2 rounded-lg">
              <FaFacebook className="text-blue-700 text-xl" />
              <p className="text-blue-700 font-semibold">
                {user.social_media.facebook}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="bg-gradient-to-b from-purple-100 via-white to-purple-100 rounded-lg shadow-md p-4">
        <h3 className="text-2xl font-semibold text-center text-gray-600">
          Recent Projects & Campaigns
        </h3>
        <div className="flex flex-col gap-6 mt-6 w-full mb-32">
          {user.projects?.length > 0 ? (
            user.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg max-w-[500px] mx-auto relative"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-xl">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.brand}</p>
                </div>
                <span className="absolute bottom-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded-full shadow-md">
                  {project.likes} Likes
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
