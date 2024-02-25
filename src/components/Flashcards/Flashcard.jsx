import React from "react";
import "../../css/Flashcard.css";
import MDEditor from "@uiw/react-md-editor";

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
      data-color-mode="light"
    >
      <div className="flashcard-front flashcard-face">
        <p className="content">{term}</p>
      </div>
      <div className="flashcard-back flashcard-face">
        <p className="content">
          <MDEditor.Markdown source={definition}></MDEditor.Markdown>
        </p>
      </div>
    </div>
  );
};

export default Flashcard;
