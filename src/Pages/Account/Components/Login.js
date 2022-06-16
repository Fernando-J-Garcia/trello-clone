import React, { useEffect, useState } from "react";
import serverInfo from "../../../literals/serverInfo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";

const Axios = require("axios");

export default function Login({ toggleSignIn, setContainerStyle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { updateCurrentUser } = useAuth();

  useEffect(() => {
    if (showPassword) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }, [showPassword]);

  const handleSignUpSwitch = () => {
    setContainerStyle("spin-animation");
    toggleSignIn();
  };

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    //Login
    Axios.post(`${serverInfo.url}/login`, {
      username: username,
      password: password,
    }).then((res) => {
      if (res.data === true) {
        console.log("login successful");
        updateCurrentUser(username);
      } else {
        setErrorMessage(res.data.message);
        setContainerStyle("shake-animation");
        if (res.data.message === undefined) {
          setErrorMessage("unkown error");
        }
      }
    });
  };
  return (
    <>
      <h1 children>Login</h1>
      <form onSubmit={handleLogin}>
        <p className="flex-start">username</p>
        <input
          type="text"
          placeholder="Enter your username here"
          required={true}
          onChange={handleUsernameInput}
        ></input>
        <p className="flex-start">password</p>
        <div className="pos-rel">
          <input
            type={passwordType}
            placeholder="Enter you password here"
            required={true}
            onChange={handlePasswordInput}
          ></input>
          {showPassword ? (
            <FaEyeSlash
              className="eye-icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
          )}
        </div>
        <button type="submit">Log in</button>
      </form>
      <p id="error-message">{errorMessage}</p>
      <p id="sign-up-link" onClick={handleSignUpSwitch}>
        Sign Up
      </p>
    </>
  );
}
