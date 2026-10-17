"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem("mk_logged_in") === "1");
    } catch {}
  }, []);

  const login = () => {
    try { localStorage.setItem("mk_logged_in", "1"); } catch {}
    setIsLoggedIn(true);
  };

  const logout = () => {
    try { localStorage.removeItem("mk_logged_in"); } catch {}
    setIsLoggedIn(false);
  };

  return <AuthCtx.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
