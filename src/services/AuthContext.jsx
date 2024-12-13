import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set autentikasi berdasarkan token
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true); // Set status login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Set status logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
