import React from "react";
import "./Searchbar.css";

const Searchbar = ({ placeholder, val, setVal }) => {
  return (
    <div className="searchbar-container">
      <input type="text" className="searchbar" placeholder={placeholder} />
    </div>
  );
};

export default Searchbar;
