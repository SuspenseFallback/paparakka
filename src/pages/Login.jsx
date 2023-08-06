import React, { useState, useEffect } from "react";
import "../css/Signup.css";
import { logData, signInWithEmail } from "../firebase/firebase";

const Login = () => {
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

  const login_handler = () => {
    signInWithEmail(email, password, (data, error) => {
      if (error) throw error;
      console.log(data);
      logData("signup_complete");
    });
  };

  useEffect(() => {
    logData("log_in");

    document.title = "Flashcards | Log in";
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
      <div className="page page-1 signup-page-1">
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
            className="button-block bottom"
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
