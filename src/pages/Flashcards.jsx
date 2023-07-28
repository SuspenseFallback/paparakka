import React from "react";
import "../css/Flashcards.css";
import FlashcardControl from "../components/Flashcards/FlashcardControl";

const Flashcards = () => {
  return (
    <>
      <div className="page page-1 flashcard-page-1">
        <FlashcardControl />
      </div>
    </>
  );
};

export default Flashcards;
