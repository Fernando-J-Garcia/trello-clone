import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function Navbar(props) {
  useEffect(() => {
    //nothing to here just rerendering the component...
  }, [props.currentBoard]);

  const { logout } = useAuth();
  if (props.currentBoard === null) return;
  return (
    <div className="navbar">
      <p className="navbar-item">{props.currentBoard.data.name}</p>
      <button className="navbar-item save-button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
