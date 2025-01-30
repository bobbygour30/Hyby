import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Convert to boolean
  }, []);

  const menuItems = [
    { name: "HOME", icon: "fa-home", path: "/" },
    { name: "PROJECTS", icon: "fa-chart-bar", path: "/projects" },
    { name: "SHARE", icon: "fa-share-alt", path: "/share" },
    { name: "NOTIFICATION", icon: "fa-bell", path: "/notifications" },
    { name: isLoggedIn ? "PROFILE" : "LOGIN", icon: "fa-user", path: isLoggedIn ? "/profile" : "/login" },
  ];

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-white shadow-t fixed bottom-0 left-0 w-full z-50">
      <div className="container mx-auto max-w-3xl flex justify-between items-center p-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center cursor-pointer ${
              selected === item.path ? "text-yellow-500" : "text-gray-800"
            }`}
            onClick={() => handleSelect(item.path)}
          >
            <i className={`fas ${item.icon} text-xl lg:text-2xl`}></i>
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
