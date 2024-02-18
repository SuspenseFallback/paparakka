import React, { useEffect, useState } from "react";
import "../css/Settings.css";
import ThemeSelector from "../components/Settings/ThemeSelector";

const Settings = () => {
  useEffect(() => {
    document.title = "Papparakka - Settings";
  }, []);

  return (
    <>
      <div className="settings-page">
        <h1 className="header">Settings</h1>
        <div className="layout">
          <div className="area">
            <div className="left-side">
              <p className="title">Theme</p>
              <p className="caption">Customise colors and modes.</p>
            </div>
            <div className="divider"></div>
            <div className="right-side">
              <ThemeSelector />
            </div>
          </div>
          <div className="area">
            <div className="left-side">
              <p className="title">Flashcard</p>
              <p className="caption">
                Customise limits, total limits and set limits.
              </p>
            </div>
            <div className="divider"></div>
            <div className="right-side">
              <div className="input-container">
                <p className="label">Total study limit per day</p>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter limit here..."
                />
              </div>
              <div className="input-container">
                <p className="label">Set study limit per day</p>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter limit here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
