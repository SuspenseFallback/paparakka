import React from "react";
import "./Modal.css";

const Modal = ({ children, open, title, set_open }) => {
  return (
    <>
      <div className={"overlay " + (open ? "" : "hidden")}></div>
      <div className={"modal " + (open ? "" : "hidden")}>
        <div className="modal-header">
          <p className="title">{title}</p>
          <span className="close" onClick={() => set_open(false)}>
            &times;
          </span>
        </div>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Modal;
