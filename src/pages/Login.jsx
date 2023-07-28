import React, { useState, useEffect } from "react";
import "../css/Signup.css";

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

  const validateStuff = () => {
    if (email.length === 0) {
      return set_error("Email must not be empty");
    }

    if (password.length === 0) {
      return set_error("Password must not be empty");
    }

    return set_error("");
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
            onClick={validateStuff}
            disabled={disabled}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
