import React, { useEffect, useState } from "react";
import "./Account.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

export default function Account() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [containerStyle, setContainerStyle] = useState("drop-in-animation");
  return (
    <div className="Login">
      <div className="login-wrapper">
        <div
          className={"login-container " + containerStyle}
          onAnimationEnd={() => setContainerStyle("")}
        >
          {isSigningUp ? (
            <SignUp
              toggleLogin={() => setIsSigningUp(false)}
              setContainerStyle={(callback) => setContainerStyle(callback)}
            />
          ) : (
            <Login
              toggleSignIn={() => setIsSigningUp(true)}
              setContainerStyle={(callback) => setContainerStyle(callback)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
