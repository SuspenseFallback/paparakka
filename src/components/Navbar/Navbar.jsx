import "./Navbar.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, logOut } from "../../firebase/firebase.js";

import SpinnerPage from "../SpinnerPage";
import Footer from "../Footer/Footer";
import Switch from "../Switch/Switch";

import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [loading, set_loading] = useState(true);
  const [user, set_user] = useState(null);
  const [is_user_items, set_is_user_items] = useState(false);
  const [is_responsive_menu, set_responsive_menu] = useState(false);
  const [navVisible, set_navVisible] = useState(true);
  const [isScrolled, set_isScrolled] = useState(false);

  useEffect(() => {
    // getUser uses onAuthStateChanged, which is a listener.
    // This means it will be called every time the auth state changes.
    // Because of this, it's not a simple async operation that we can
    // wrap in a promise. We will leave it as a callback for now.
    getUser((data) => {
      set_user(data);
      set_loading(false);

      if (data && window.location.pathname === "/") {
        navigate("/dashboard");
      }
    });
  }, []);

  const logOutHandler = async () => {
    await logOut();
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("resize", () => {
      if (window.innerWidth > 685) {
        set_responsive_menu(false);
      }
    });
  }, []);

  const goToLink = (link) => {
    set_responsive_menu(false);
    set_is_user_items(false);
    navigate(link);
  };

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledPastTop = currentScrollY > 5;

      set_isScrolled(scrolledPastTop);

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        set_navVisible(false);
      } else {
        set_navVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className={
          "app-container light-theme"
        }
      >
        {loading ? (
          <>
            <SpinnerPage />
          </>
        ) : (
          <>
            <div className="nav-container">
            <div className={"nav " + (navVisible ? "visible" : "hidden") + (isScrolled ? " scrolled" : "")}> 
              <div
                className="logo-container"
                onClick={() => (user ? navigate("/dashboard") : navigate("/"))}
              >
                <div className="text-container">
                  <p className="nav-logo">Papparakka</p>
                </div>

              <div className="right-nav-items">
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
                </div>
              </div>

              <div className="nav-items">
                {/* <div className="nav-item nav-switch">
                  <Switch
                    isOn={dark_theme}
                    handleToggle={() => set_dark_theme(!dark_theme)}
                  />
                </div> */}
                
                {user ? (
                  <>
                    <div
                      className="nav-item nav-hide nav-button button button-secondary"
                      onClick={() => goToLink("/new-set")}
                    >
                      <NavLink className="nav-link" to="new-set">
                        Create a new set <span className="pi pi-plus"></span>
                      </NavLink>
                    </div>

                    <div className="menu-container"
                    onMouseEnter={() => set_is_user_items(true)}
                    onMouseLeave={() => set_is_user_items(false)}
                    >
                      <div
                        className="nav-item nav-hide nav-user"
                        
                      >
                      <p className="nav-link nav-user-trigger">
                        {user.username}{" "}
                        <span
                          className={
                            "icon pi" +
                            (is_user_items ? " pi-caret-up" : " pi-caret-down")
                          }
                        ></span>
                      </p>
                      <div
                        className={"user-menu " + (is_user_items ? "visible" : "hidden")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="user-link"
                          onClick={() => goToLink("/stats")}
                        >
                          <p>Stats</p>
                          <span className="icon pi pi-chart-bar"></span>
                        </div>
                        <div
                          className="user-link"
                          onClick={() => goToLink("/settings")}
                        >
                          <p>Settings</p>
                          <span className="icon pi pi-cog"></span>
                        </div>
                        <div
                          className="user-link"
                          onClick={() => goToLink("/my-sets")}
                        >
                          <p>My sets</p>
                          <span className="icon pi pi-folder"></span>
                        </div>
                        <div className="divider"></div>
                        <div
                          className="user-link log-out"
                          onClick={logOutHandler}
                        >
                          <p>Log out</p>
                          <span className="icon pi pi-sign-out"></span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </>
                ) : (
                  <>
                  <div
                      className="nav-item nav-hide hover-underline"
                      onClick={() => goToLink("/login")}
                    >
                      {" "}
                      <NavLink className="nav-link" to="login">
                        Log in
                      </NavLink>
                    </div>
                    <div
                      className="nav-item nav-hide nav-button ="
                      onClick={() => goToLink("/signup")}
                    >
                      {" "}
                      <NavLink className="nav-link" to="signup">
                        Sign up
                      </NavLink>
                    </div>
                    
                  </>
                )}
                <div
                  className="nav-item nav-menu"
                  onClick={() => set_responsive_menu(!is_responsive_menu)}
                >
                  <span className="icon pi pi-bars"></span>
                </div>
              </div>
            </div>
            <div className={"sidebar " + (is_responsive_menu ? "" : "hidden")}>
              <div className="top">
                <p className="logo">Papparakka</p>

                <span
                  className="icon pi pi-times"
                  onClick={() => set_responsive_menu(false)}
                ></span>
              </div>
              <div className="items">
                <div className="item">
                  <p className="text">Home</p>
                  <span className="icon pi pi-home"></span>
                </div>
                <div className="item">
                  <p className="text">Sets</p>
                  <span className="icon pi pi-clone"></span>
                </div>
                <div className="item">
                  <p className="text">Create a new set</p>
                  <span className="icon pi pi-plus"></span>
                </div>

                {/* divider */}
                <div className="divider"></div>
                {/* divider */}

                <div className="item">
                  <p className="text">Settings</p>
                  <span className="icon pi pi-cog"></span>
                </div>
                <div className="item">
                  <p className="text">Stats</p>
                  <span className="icon pi pi-chart-bar"></span>
                </div>
                <div className="item">
                  <p className="text">My sets</p>
                  <span className="icon pi pi-folder"></span>
                </div>
                <div className="item log-out">
                  <p className="text">Log out</p>
                  <span className="icon pi pi-sign-out"></span>
                </div>
              </div>
            </div>
            </div>
            <div
              className={is_responsive_menu ? "overlay" : ""}
              onClick={() => set_responsive_menu(false)}
            ></div>
            <div className={"body-wrapper"}>
              <Outlet />
              <Footer />
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Navbar;
