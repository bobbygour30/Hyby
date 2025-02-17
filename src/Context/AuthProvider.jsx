import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on initial load
  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // Login function
  const login = (token) => {
    Cookies.set("access_token", token, { expires: 7, secure: true, sameSite: "strict" }); // Set cookie with security attributes
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("access_token"); // Remove the cookie
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);