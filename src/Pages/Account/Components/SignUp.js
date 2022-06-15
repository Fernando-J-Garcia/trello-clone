import React from "react";

export default function SignUp({ toggleLogin, setContainerStyle }) {
  const handleClick = () => {
    setContainerStyle("spin-animation");
    toggleLogin();
  };
  return (
    <>
      <h1 children>Sign up</h1>
      <p className="flex-start">username</p>
      <input type="text" placeholder="Enter your username here"></input>
      <p className="flex-start">password</p>
      <input type="password" placeholder="Enter you password here"></input>
      <button>Sign Up</button>
      <p id="sign-up-link" onClick={handleClick}>
        Login
      </p>
    </>
  );
}
