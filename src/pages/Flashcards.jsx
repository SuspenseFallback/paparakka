import React, { useEffect, useState } from "react";
import "../css/Flashcards.css";
import FlashcardControl from "../components/Flashcards/FlashcardControl";
import { getSet, logData } from "../firebase/firebase";
import { useParams } from "react-router";

const Flashcards = ({ user }) => {
  const { id } = useParams();
  const [deck, set_deck] = useState({});
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    getSet(id).then((data) => {
      console.log(data);
      set_loading(false);
      set_deck(data);
      document.title = "Papparakka | " + data.title;
      logData("flashcards - " + data.id);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <span className="pi pi-spinner pi-spin"></span>
      ) : (
        <div className="page page-1 flashcard-page-1">
          <FlashcardControl deck={deck} />
        </div>
      )}
    </>
  );
};

export default Flashcards;
