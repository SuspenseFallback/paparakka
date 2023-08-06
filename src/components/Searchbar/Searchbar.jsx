import React from "react";
import "./Searchbar.css";

const Searchbar = ({ placeholder, val, setVal, searchQuery }) => {
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="searchbar"
        placeholder={placeholder}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  );
};

export default Searchbar;
