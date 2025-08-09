import React, { useState } from "react";
import "../../css/Flashcard.css";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

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
      ref={flashcard}
      data-color-mode="light"
    >
      <div
        className="flashcard-front flashcard-face"
        onClick={active ? () => setFlip(!flip) : null}
      >
        <MDEditor.Markdown className="content" source={term} />
      </div>
      <div
        className="flashcard-back flashcard-face"
        onClick={active ? () => setFlip(!flip) : null}
      >
        <p className="content">
          <MDEditor.Markdown source={definition} />
        </p>
      </div>
    </div>
  );
};

export default Flashcard;
