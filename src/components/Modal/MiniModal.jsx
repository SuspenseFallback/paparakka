import React from "react";
import "./Modal.css";

const MiniModal = ({ text, open, setOpen, action }) => {
  return (
    <>
      <div className={"overlay " + (open ? "" : "hidden")}></div>
      <div className={"mini-modal " + (open ? "" : "hidden")}>
        <p className="title">Are you sure you want to delete {text}?</p>
        <div className="buttons">
          <button className="button secondary" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className="button danger" onClick={action}>
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniModal;
