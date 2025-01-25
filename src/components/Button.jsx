import React from "react";

export const Button = ({ type = "button", className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
