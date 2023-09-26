import React from "react";
import "../../css/Flashcard.css";

const Flashcard = ({
  flip,
  setFlip,
  flashcard,
  term,
  definition,
  active = true,
}) => {
  return (
    <div
      className={"flashcard " + (flip ? "flip" : "")}
      onClick={active ? () => setFlip(!flip) : null}
      ref={flashcard}
    >
      <div className="flashcard-front flashcard-face">
        <p className="content">{term}</p>
      </div>
      <div className="flashcard-back flashcard-face">
        <p className="content">{definition}</p>
      </div>
    </div>
  );
};

export default Flashcard;
