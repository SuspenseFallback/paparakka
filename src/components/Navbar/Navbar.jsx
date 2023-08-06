import "./Navbar.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, logOut } from "../../firebase/firebase.js";

import SpinnerPage from "../SpinnerPage";
import Footer from "../Footer/Footer";

const Navbar = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isUserItems, setIsUserItems] = useState(false);
  const [isResponsiveMenu, setResponsiveMenu] = useState(false);

  useEffect(() => {
    getUser((data) => {
      console.log(data);
      setUser(data);
      setLoading(false);
    });
  }, []);

  const logOutHandler = () => {
    logOut((err) => {
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
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        document.querySelector(".nav").classList.add("active");
      } else {
        document.querySelector(".nav").classList.remove("active");
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
                ? "nav-item hover-underline"
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
                ? "nav-item hover-underline"
                : "nav-long-item hover-underline"
            }
            onClick={() => goToLink("/decks")}
          >
            <NavLink className={"nav-link"} to="decks">
              Decks
            </NavLink>
          </div>
          {user ? (
            <>
              <div
                className="nav-item nav-button button"
                onClick={() => goToLink("/new-deck")}
              >
                {" "}
                <NavLink className="nav-link" to="new-deck">
                  Create a new deck <span className="pi pi-plus"></span>
                </NavLink>
              </div>
              <div className="nav-item nav-user">
                <p
                  className="nav-link"
                  onClick={() => setIsUserItems(!isUserItems)}
                >
                  {user.username}{" "}
                  <span
                    className={
                      "icon pi" +
                      (isUserItems ? " pi-caret-up" : " pi-caret-down")
                    }
                  ></span>
                </p>
                <div className={"user-menu " + (isUserItems ? "" : "hidden")}>
                  <div className="user-link">
                    <span className="icon pi pi-cog"></span>
                    <p>Stats</p>
                  </div>
                  <div className="user-link">
                    <span className="icon pi pi-chart-bar"></span>
                    <p>Settings</p>
                  </div>
                  <div className="user-link">
                    <span className="icon pi pi-clone"></span>
                    <p>My sets</p>
                  </div>
                  <div className="divider"></div>
                  <div className="user-link log-out">
                    <span className="icon pi pi-sign-out"></span>
                    <p>Log out</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
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
          )}
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
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
