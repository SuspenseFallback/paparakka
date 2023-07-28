import React, { useState } from "react";
import "../../css/Flashcard.css";

const Flashcard = ({ flip, setFlip, flashcard }) => {
  return (
    <div
      className={"flashcard" + (flip ? " flip" : "")}
      onClick={() => setFlip(!flip)}
      ref={flashcard}
    >
      <div className="flashcard-front flashcard-face">
        <p className="content">Hello</p>
      </div>
      <div className="flashcard-back flashcard-face">
        <p className="content">Bye</p>
      </div>
    </div>
  );
};

export default Flashcard;
