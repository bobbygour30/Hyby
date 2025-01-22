import React, { useState } from "react";

const Footer = () => {
  const [selected, setSelected] = useState("HOME"); // Default selected icon

  const menuItems = [
    { name: "HOME", icon: "fa-home" },
    { name: "PROJECTS", icon: "fa-chart-bar" },
    { name: "SHARE", icon: "fa-share-alt" },
    { name: "NOTIFICATION", icon: "fa-bell" },
    { name: "LOGIN", icon: "fa-user" },
  ];

  return (
    <div className="bg-white shadow-t fixed bottom-0 left-0 w-full z-50">
      <div className="container mx-auto max-w-3xl flex justify-between items-center p-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col items-center cursor-pointer ${
              selected === item.name ? "text-yellow-500" : "text-gray-800"
            }`}
            onClick={() => setSelected(item.name)}
          >
            <i className={`fas ${item.icon} text-sm lg:text-2xl`}></i>
            <span className="text-[10px] font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
