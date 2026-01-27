import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("mb_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed ? { name: parsed.name, email: parsed.email, role: parsed.role } : null);
      } catch {
        setUser(null);
      }
    }
  }, []);

  async function register(name, email, password, role = "user") {
    try {
      const res = await fetch("http://localhost/my-make-up-brand/backend/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (data.success) {
        setUser({ name, email, role: data.user.role });
        localStorage.setItem("mb_user", JSON.stringify({ name, email, role: data.user.role }));
        return { ok: true };
      } else {
        return { ok: false, message: data.message || "Registration failed" };
      }
    } catch (err) {
      return { ok: false, message: "Network error. Please try again." };
    }
  }

  async function login(email, password) {
    try {
      const res = await fetch("http://localhost/my-make-up-brand/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        setUser({ name: data.user.name, email: data.user.email, role: data.user.role });
        localStorage.setItem("mb_user", JSON.stringify(data.user));
        return { ok: true };
      } else {
        return { ok: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      return { ok: false, message: "Network error. Please try again." };
    }
  }

  async function logout() {
    try {
      await fetch("http://localhost/my-make-up-brand/backend/api/logout.php");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("mb_user");
    setUser(null);
  }

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
