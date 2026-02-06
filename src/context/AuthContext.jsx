import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null); // will hold auth state and functions
const API_URL = "http://localhost:5000/api/auth"; // adjust as needed

// Provider
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null); // { id, fullName, email, accessToken }
  const [loading, setLoading] = useState(true); // to check auth status on app load

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user in localStorage", err);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // REGISTER
  const register = async (fullName, email, password) => {
    const res = await fetch(`${API_URL}/register`, { // adjust as needed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }), // send registration data
    });

    const data = await res.json(); // response data
    if (!res.ok) {
      return { error: data.message }; // return error message
    }
    return { error: null }; // success
  };

  // LOGIN
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`,
      { // adjust as needed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // send login data
      });

    const data = await res.json(); // response data
    if (!res.ok) {
      return { error: data.message }; // return error message
    }

    // Save JWT + user
    localStorage.setItem("token", data.token); // JWT
    localStorage.setItem("user", JSON.stringify(data.user)); // user info

    setUser(data.user); // set user in context
    return { error: null }; // success
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token"); // JWT
    localStorage.removeItem("user"); // user info
    setUser(null); // clear user in context
  };

  // forgot password
  const forgotPassword = async (email) => {
    const res = await fetch(`${API_URL}/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    )
    const data = await res.json();
    if (!res.ok) {
      return { error: data.message };
    }
    return { error: null };
  }

  // reset password
  const resetPassword = async (token, newPassword) => {
    const res = await fetch(`${API_URL}/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    });

    const data = await res.json();
    console.log("DATA:", data)

    if (!res.ok) {
      throw new Error(data.message || "Reset failed");
    }

    return data;
  };

  return <AuthContext.Provider value={{ user, loading, register, login, logout, forgotPassword,resetPassword }}>{children}</AuthContext.Provider>
};

// Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext); // get context
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};