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
  const [is_active, set_is_active] = useState(false);

  useEffect(() => {
    getUser((data) => {
      console.log(data);
      setUser(data);
      setLoading(false);

      if (data && window.location.pathname === "/") {
        navigate("/dashboard");
      }
    });
  }, []);

  const logOutHandler = () => {
    logOut(() => {
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
      if (window.scrollY > 70) {
        set_is_active(true);
      } else {
        set_is_active(false);
      }
    });
  }, []);

  const goToLink = (link) => {
    setResponsiveMenu(false);
    setIsUserItems(false);
    navigate(link);
  };

  return loading ? (
    <>
      <SpinnerPage />
    </>
  ) : (
    <>
      <div className={"nav " + (is_active ? "active" : "")}>
        <p className="nav-logo">Flashcards</p>
        <div className="nav-items">
          <div
            className="nav-item nav-hide hover-underline"
            onClick={() => goToLink(user ? "/dashboard" : "/")}
          >
            <NavLink className={"nav-link"} to="">
              Home
            </NavLink>
          </div>
          <div
            className="nav-item nav-hide hover-underline"
            onClick={() => goToLink("/sets")}
          >
            <NavLink className={"nav-link"} to="sets">
              Sets
            </NavLink>
          </div>
          {user ? (
            <>
              <div
                className="nav-item nav-hide nav-button button"
                onClick={() => goToLink("/new-set")}
              >
                <NavLink className="nav-link" to="new-set">
                  Create a new set <span className="pi pi-plus"></span>
                </NavLink>
              </div>
              <div className="nav-item nav-hide nav-user">
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
                    <p>Stats</p>
                    <span className="icon pi pi-chart-bar"></span>
                  </div>
                  <div className="user-link">
                    <p>Settings</p>
                    <span className="icon pi pi-cog"></span>
                  </div>
                  <div
                    className="user-link"
                    onClick={() => goToLink("/my-sets")}
                  >
                    <p>My sets</p>
                    <span className="icon pi pi-clone"></span>
                  </div>
                  <div className="divider"></div>
                  <div className="user-link log-out" onClick={logOutHandler}>
                    <p>Log out</p>
                    <span className="icon pi pi-sign-out"></span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="nav-item nav-hide nav-button button"
                onClick={() => goToLink("/signup")}
              >
                {" "}
                <NavLink className="nav-link" to="signup">
                  Sign up
                </NavLink>
              </div>
              <div
                className="nav-item nav-hide nav-button button"
                onClick={() => goToLink("/login")}
              >
                {" "}
                <NavLink className="nav-link" to="login">
                  Log in
                </NavLink>
              </div>
            </>
          )}
          <div
            className="nav-item nav-menu"
            onClick={() => setResponsiveMenu(!isResponsiveMenu)}
          >
            <span className="icon pi pi-bars"></span>
          </div>
        </div>
      </div>
      <div className={"sidebar " + (isResponsiveMenu ? "" : "hidden")}></div>
      <div className={"body-wrapper" + (isResponsiveMenu ? "overlay" : "")}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
