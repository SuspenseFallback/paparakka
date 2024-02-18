import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer">
          <div className="logo-column">
            <p className="logo">Papparakka</p>
          </div>
          <div className="column">
            <p className="link">Home</p>
            <p className="link">About</p>
            <p className="link">Decks</p>
            <p className="link">My sets</p>
            <p className="link">Create a new deck</p>
          </div>
          <div className="column">
            <p className="link">Stats</p>
            <p className="link">Help</p>
            <p className="link">Settings</p>
          </div>
          <div className="column">
            <p className="link">Sign up</p>
            <p className="link">Log in</p>
          </div>
          <div className="column extra">
            <p className="link">Made by Krithin Jay Pakshootra</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
