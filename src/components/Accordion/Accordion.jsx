import React, { useState } from "react";
import "./Accordion.css";

const Accordion = ({ title, content }) => {
  const [open, set_open] = useState(false);

  return (
    <>
      <div className="accordion">
        <button className={"top-bar " + (open ? "active" : "")} onClick={() => set_open(!open)}>
          <p className="title">{title}</p>
          <span>{!open ? "+" : "-"}</span>
        </button>
        <div className={"content " + (open ? "" : "hidden")}>
          <p className="content">{content}</p>
        </div>
      </div>
    </>
  );
};

export default Accordion;
