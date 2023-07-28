import "./Navbar.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSession, signOut } from "../supabase/index";

import SpinnerPage from "./SpinnerPage";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUserItems, setIsUserItems] = useState(false);
  const [isResponsiveMenu, setResponsiveMenu] = useState(false);

  useEffect(() => {
    getSession((data, error) => {
      if (error) console.log(error);

      if (data.session) {
        setIsLoggedIn(true);
        setSession(data.session);
      } else {
        setIsLoggedIn(false);
        setSession(null);
      }

      setLoading(false);

      console.log(data);
    });
  }, []);

  const signOutHandler = () => {
    signOut((err) => {
      if (err) throw err;

      navigate("/");
    });
  };

  useEffect(() => {
    document.addEventListener("resize", () => {
      if (window.innerWidth > 685) {
        setResponsiveMenu(false);
      }
    });
  }, []);

  const goToLink = (link) => {
    setResponsiveMenu(false);
    navigate(link);
  };

  return loading ? (
    <>
      <SpinnerPage />
    </>
  ) : (
    <>
      <div className="nav">
        <p className="nav-logo">Flashcards</p>
        <div className="nav-items">
          <div
            className={
              !isResponsiveMenu
                ? "nav-item hover-underline" + (isUserItems ? " hidden" : "")
                : "nav-long-item hover-underline"
            }
            onClick={() => goToLink("/")}
          >
            <NavLink className={"nav-link"} to="">
              Home
            </NavLink>
          </div>
          <div
            className={
              !isResponsiveMenu
                ? "nav-item hover-underline" + (isUserItems ? " hidden" : "")
                : "nav-long-item hover-underline"
            }
            onClick={() => goToLink("/decks")}
          >
            <NavLink className={"nav-link "} to="decks">
              Decks
            </NavLink>
          </div>
          <>
            <div
              className="nav-item nav-button button"
              onClick={() => goToLink("/signup")}
            >
              {" "}
              <NavLink className="nav-link" to="signup">
                Sign up
              </NavLink>
            </div>
            <div
              className="nav-item nav-button button"
              onClick={() => goToLink("/login")}
            >
              {" "}
              <NavLink className="nav-link" to="login">
                Log in
              </NavLink>
            </div>
          </>
          {/* <div
            className="nav-item nav-menu"
            onClick={() => setResponsiveMenu(!isResponsiveMenu)}
          >
            <FontAwesomeIcon icon={faBars} />
          </div> */}
        </div>
      </div>
      <div className={"body-wrapper" + (isResponsiveMenu ? "overlay" : "")}>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
