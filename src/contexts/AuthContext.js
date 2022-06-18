import React, { useContext, useState } from "react";
import serverInfo from "../literals/serverInfo";
const Axios = require("axios");

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  function updateCurrentUser(user) {
    setCurrentUser(user);
  }
  function logout() {
    setCurrentUser("");
  }

  const value = {
    currentUser,
    updateCurrentUser,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
