// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email }

  // Load saved user
  useEffect(() => {
    const saved = localStorage.getItem("mb_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed ? { name: parsed.name, email: parsed.email } : null);
      } catch {
        setUser(null);
      }
    }
  }, []);

  function register(name, email, password) {
    const newUser = { name, email, password };
    localStorage.setItem("mb_user", JSON.stringify(newUser));
    setUser({ name, email });
  }

  function login(email, password) {
    const saved = localStorage.getItem("mb_user");
    if (!saved) {
      return { ok: false, message: "No account found. Please register first." };
    }

    try {
      const parsed = JSON.parse(saved);
      if (parsed.email === email && parsed.password === password) {
        setUser({ name: parsed.name, email: parsed.email });
        return { ok: true };
      } else {
        return { ok: false, message: "Wrong email or password." };
      }
    } catch {
      return { ok: false, message: "Something went wrong. Try registering again." };
    }
  }

  function logout() {
    localStorage.removeItem("mb_user");
    setUser(null);
  }

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
