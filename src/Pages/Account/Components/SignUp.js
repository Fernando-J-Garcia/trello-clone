import React, { useEffect, useState } from "react";
import serverInfo from "../../../literals/serverInfo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
const Axios = require("axios");

export default function SignUp({ toggleLogin, setContainerStyle }) {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLoginSwitch = () => {
    setContainerStyle("spin-animation");
    toggleLogin();
  };

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setIsLoading(true);
    Axios.post(`${serverInfo.url}/register`, {
      username: username,
      password: password,
    }).then((res) => {
      setIsLoading(false);
      if (res.data === true) {
        console.log("sign up successful");
        updateCurrentUser(username);
      } else {
        setErrorMessage(res.data.message);
        setContainerStyle("shake-animation");
        if (res.data.message === undefined) {
          setErrorMessage("unknown error");
        }
      }
    });
  };
  return (
    <>
      <h1 children>Sign up</h1>
      <form onSubmit={handleSignUp}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sign Up" : "Loading..."}
        </button>
      </form>
      <p id="error-message">{errorMessage}</p>
      <p id="login-link" onClick={handleLoginSwitch}>
        Login
      </p>
    </>
  );
}
