import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Flashcard from "./Flashcard";
import randint from "../../helpers/random.js";
import gsap from "gsap";
import FlashcardControlBar from "./FlashcardControlBar.jsx";

const FlashcardControl = ({ deck }) => {
  // state

  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(1);
  const [term, setTerm] = useState(deck.flashcards[0].term);
  const [definition, setDefinition] = useState(deck.flashcards[0].definition);
  const [play, setPlay] = useState(false);

  const flashcardRef = useRef();

  console.log(deck);
  // control functions

  const toggleFlip = () => {
    setFlip(!flip);
  };

  const goFullLeft = () => {
    if (index !== 1) {
      setIndex(1);
    }
  };

  const goLeft = () => {
    if (index !== 1) {
      setIndex(index - 1);
    }
  };

  const goRight = () => {
    if (index !== deck.flashcards.length) {
      setIndex(index + 1);
    }
  };

  const goFullRight = () => {
    if (index !== deck.flashcards.length) {
      setIndex(deck.flashcards.length);
    }
  };

  const playCards = () => {
    setPlay(!play);
  };

  const shuffle = () => {
    const arr = [55, 24, 77, 84, 36];

    console.log(og_shuffle(arr));
  };

  // hooks

  useEffect(() => {
    const card = deck.flashcards[index - 1];

    setTerm(card.term);
    setDefinition(card.definition);
  }, [index, deck]);

  const catchKeystrokes = (e) => {
    if (e.key === "ArrowRight") {
      goRight();
    } else if (e.key === "ArrowLeft") {
      goLeft();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", catchKeystrokes);

    return () => {
      window.removeEventListener("keydown", catchKeystrokes);
    };
  }, [goLeft, goRight]);

  // helper functions

  function og_shuffle(arr) {
    const array = arr.slice();
    const newarr = [];

    for (var i = arr.length + 1; i > 0; i--) {
      let rand = randint(0, i);

      let removed = array[rand];
      array.splice(array[rand], 1);
      console.log(array);

      newarr.push(removed);
    }

    return newarr;
  }

  // jsx

  return (
    <>
      <div className="controls-container">
        {/* container for flashcard - contains the actual card */}
        <div className="flashcards-container">
          <Flashcard
            flip={flip}
            setFlip={setFlip}
            flashcard={flashcardRef}
            term={term}
            definition={definition}
          />
        </div>
        {/* flashcard index */}
        <div className="number">
          <p className="num">
            {index}/{deck.flashcards.length}
          </p>
        </div>
        <FlashcardControlBar
          index={index}
          goLeft={goLeft}
          goRight={goRight}
          goFullLeft={goFullLeft}
          goFullRight={goFullRight}
          play={play}
          shuffle={shuffle}
          playCards={playCards}
          flip={flip}
          toggleFlip={toggleFlip}
          deck={deck}
        />
      </div>
    </>
  );
};

export default FlashcardControl;
