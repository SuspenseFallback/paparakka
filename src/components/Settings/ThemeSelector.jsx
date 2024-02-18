import React from "react";

const ThemeSelector = () => {
  return (
    <div className="theme-selector">
      <div className="light">
        <p className="text">
          <input type="radio" name="mode" /> Light mode
        </p>
        <div className="illustration">
          <div className="illustration-card">
            <div className="text1"></div>
            <div className="text2"></div>
          </div>
          <div className="illustration-controls">
            <i className="pi pi-angle-double-left"></i>
            <i className="pi pi-angle-left"></i>
            <i className="pi pi-angle-up"></i>
            <i className="pi pi-angle-right"></i>
            <i className="pi pi-angle-double-right"></i>
          </div>
        </div>
      </div>
      <div className="dark">
        <p className="text">
          <input type="radio" name="mode" /> Dark mode
        </p>
        <div className="illustration">
          <div className="illustration-card">
            <div className="text1"></div>
            <div className="text2"></div>
          </div>
          <div className="illustration-controls">
            <i className="pi pi-angle-double-left"></i>
            <i className="pi pi-angle-left"></i>
            <i className="pi pi-angle-up"></i>
            <i className="pi pi-angle-right"></i>
            <i className="pi pi-angle-double-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
