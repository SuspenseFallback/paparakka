import React, { useState, useEffect } from "react"
import "../css/Signup.css"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter"
import { validate } from "email-validator"
import { logData, signUpWithEmail } from "../firebase/firebase.js"
import { useNavigate } from "react-router"

const Signup = () => {
  const navigate = useNavigate()

  const [error, set_error] = useState(null)
  const [username, set_username] = useState("")
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")
  const [is_password_visible, set_is_password_visible] = useState(false)
  const [disabled, set_disabled] = useState(true)

  const sign_up = () => {
    signUpWithEmail(username, email, password, (data, err) => {
      if (err) throw err
      console.log(data)
      logData("signup_complete")
    })
  }

  useEffect(() => {
    logData("sign_up")

    document.title = "Flashcards | Sign up"
  }, [])

  useEffect(() => {
    if (!validateStuff()) {
      set_disabled(true)
    } else {
      set_disabled(false)
    }
  }, [username, email, password])

  const validateStuff = () => {
    if (username.length < 3 || username.length > 20) {
      return set_error("Username must be between 3 and 20 characters long")
    }

    if (!validate(email)) {
      return set_error("Email is invalid")
    }

    if (password.length < 6 || password.length > 40) {
      return set_error("Password must be between 6 and 40 characters long")
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      return set_error(
        "Password must contain at least one lowercase and one uppercase character"
      )
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_])/.test(password)
    ) {
      return set_error(
        "Password must contain at least one numeric character and one special character (~! @#$%^&*()_)"
      )
    }

    set_error("")
    return true
  }

  return (
    <>
      <div className="page page-1 signup-page-1">
        <div className="form">
          <h1 className="title">Sign up</h1>
          <div className="input-container">
            <p className="label">Username</p>
            <input
              type="text"
              className="input"
              placeholder="Enter username here..."
              value={username}
              onChange={(e) => set_username(e.target.value)}
            />
          </div>
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
            <div className="password-input">
              <input
                type={is_password_visible ? "text" : "password"}
                className="input password"
                placeholder="Enter password here..."
                value={password}
                onChange={(e) => set_password(e.target.value)}
                onPaste={(e) => e.preventDefault()}
              />
              <span
                className={
                  "icon pi " + (is_password_visible ? "pi-eye-slash" : "pi-eye")
                }
                onClick={() => set_is_password_visible(!is_password_visible)}
              ></span>
            </div>
          </div>
          <PasswordStrengthMeter password={password} />
          <p className="error">{error}</p>
          <button
            className="button-block bottom"
            onClick={sign_up}
            disabled={disabled}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  )
}

export default Signup
