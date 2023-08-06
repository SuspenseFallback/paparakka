import React, { useEffect } from "react";
import "../css/Flashcards.css";
import FlashcardControl from "../components/Flashcards/FlashcardControl";
import { logData } from "../firebase/firebase";

const Flashcards = () => {
  useEffect(() => {
    logData("flashcards");

    document.title = "Flashcards | Flashcards";
  }, []);

  return (
    <>
      <div className="page page-1 flashcard-page-1">
        <FlashcardControl />
      </div>
    </>
  );
};

export default Flashcards;
