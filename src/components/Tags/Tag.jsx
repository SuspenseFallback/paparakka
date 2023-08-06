import React from "react";
import "./Tag.css";

const Tag = ({ text, removeTag }) => {
  return (
    <>
      <span className="tag">
        {text}
        <span className="icon pi pi-times" onClick={removeTag}></span>
      </span>
    </>
  );
};

export default Tag;
