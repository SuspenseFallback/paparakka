import React, { useState, useEffect, useRef } from "react";
import "../css/Signup.css";
import { logData, signInWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router";
import HomeAnim from "../components/Home/HomeAnim";

const Login = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const [error, set_error] = useState(null);
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [disabled, set_disabled] = useState(true);

  useEffect(() => {
    if (!validateStuff()) {
      set_disabled(true);
    } else {
      set_disabled(false);
    }
  }, [email, password]);

  const login_handler = async () => {
    // This function handles the login process.
    // It calls the signInWithEmail function from firebase.js,
    // and then handles the response.
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      // We use a switch statement to handle different error codes.
      // This makes the code cleaner and easier to read.
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
          set_error("Invalid credentials");
          break;
        case "auth/user-disabled":
          set_error("User banned");
          break;
        default:
          set_error("An unknown error occurred.");
          break;
      }
    } else {
      logData("login_complete");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    logData("log_in");

    document.title = "Papparakka | Log in";
  }, []);

  const validateStuff = () => {
    if (email.length === 0) {
      return set_error("Email must not be empty");
    }

    if (password.length === 0) {
      return set_error("Password must not be empty");
    }

    set_error("");
    return true;
  };

  return (
    <>
      <div className="page page-1 login-page-1" ref={ref}>
        <div className="image log-in">
          <div className="header-container">
            <p className="header">Log in to access all features!</p>
          </div>
          <div className="img-container">
            <div className="anim-container">
              <HomeAnim home_ref={ref} className=".login-page-1 " />
            </div>
          </div>
        </div>
        <div className="form">
          <h1 className="title">Log in</h1>
          <div className="input-container">
            <p className="label">Email</p>
            <input
              type="text"
              className="input"
              placeholder="Enter email here..."
              value={email}
              onChange={(e) => set_email(e.target.value)}
            />
          </div>
          <div className="input-container">
            <p className="label">Password</p>
            <input
              type="password"
              className="input"
              placeholder="Enter password here..."
              value={password}
              onChange={(e) => set_password(e.target.value)}
              onPaste={(e) => e.preventDefault()}
            />
          </div>
          <p className="error">{error}</p>
          <button
            className="button-block"
            onClick={login_handler}
            disabled={disabled}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
