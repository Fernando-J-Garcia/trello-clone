import React from "react";

export default function Login({ toggleSignIn, setContainerStyle }) {
  const handleClick = () => {
    setContainerStyle("spin-animation");
    toggleSignIn();
  };
  return (
    <>
      <h1 children>Login</h1>
      <p className="flex-start">username</p>
      <input type="text" placeholder="Enter your username here"></input>
      <p className="flex-start">password</p>
      <input type="password" placeholder="Enter you password here"></input>
      <button>Log in</button>
      <p id="login-link" onClick={handleClick}>
        Sign Up
      </p>
    </>
  );
}
