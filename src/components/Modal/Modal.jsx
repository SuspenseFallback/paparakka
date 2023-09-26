import React from "react";
import "./Modal.css";

const Modal = ({ children, open }) => {
  return <div className={"modal " + (open ? "" : "hidden")}>{children}</div>;
};

export default Modal;
