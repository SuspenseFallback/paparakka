import "./Navbar.css";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser, logOut } from "../../firebase/firebase.js";

import SpinnerPage from "../SpinnerPage";
import Footer from "../Footer/Footer";
import Switch from "../Switch/Switch";

const Navbar = () => {
  const navigate = useNavigate();

  const [loading, set_loading] = useState(true);
  const [user, set_user] = useState(null);
  const [is_user_items, set_is_user_items] = useState(false);
  const [is_responsive_menu, set_responsive_menu] = useState(false);
  const [is_active, set_is_active] = useState(false);

  // const [dark_theme, set_dark_theme] = useState(true);

  // useEffect(() => {
  //   const dark = localStorage.getItem("dark_theme");

  //   if (dark !== undefined) {
  //     set_dark_theme(dark == "dark" ? true : false);
  //   } else {
  //     if (
  //       window.matchMedia &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ) {
  //       set_dark_theme(true);
  //     }

  //     window
  //       .matchMedia("(prefers-color-scheme: dark)")
  //       .addEventListener("change", (event) => {
  //         const newColorScheme = event.matches ? true : false;
  //         set_dark_theme(newColorScheme);
  //         localStorage.setItem("dark_theme", newColorScheme);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("dark_theme", dark_theme);
  // }, [dark_theme]);

  useEffect(() => {
    getUser((data) => {
      console.log(data);
      set_user(data);
      set_loading(false);

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
        set_responsive_menu(false);
      }
    });
  }, []);

  const goToLink = (link) => {
    set_responsive_menu(false);
    set_is_user_items(false);
    navigate(link);
  };

  return (
    <>
      <div
        className={
          "app-container light-theme"
          // "app-container" + (dark_theme ? " dark-theme" : " light-theme")
        }
      >
        {loading ? (
          <>
            <SpinnerPage />
          </>
        ) : (
          <>
            <div className={"nav " + (is_active ? "active" : "")}>
              <p className="nav-logo">Flashcards</p>
              <div className="nav-items">
                {/* <div className="nav-item nav-switch">
                  <Switch
                    isOn={dark_theme}
                    handleToggle={() => set_dark_theme(!dark_theme)}
                  />
                </div> */}
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
                    <div
                      className="nav-item nav-hide nav-user"
                      onClick={() => set_is_user_items(!is_user_items)}
                    >
                      <p className="nav-link">
                        {user.username}{" "}
                        <span
                          className={
                            "icon pi" +
                            (is_user_items ? " pi-caret-up" : " pi-caret-down")
                          }
                        ></span>
                      </p>
                      <div
                        className={
                          "user-menu " + (is_user_items ? "" : "hidden")
                        }
                      >
                        <div className="user-link">
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
                  onClick={() => set_responsive_menu(!is_responsive_menu)}
                >
                  <span className="icon pi pi-bars"></span>
                </div>
              </div>
            </div>
            <div className={"sidebar " + (is_responsive_menu ? "" : "hidden")}>
              <div className="top">
                <p className="logo">Flashcards</p>

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
      </div>
    </>
  );
};

export default Navbar;
