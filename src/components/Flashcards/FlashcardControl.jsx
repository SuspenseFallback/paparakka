import React, { useState, useRef, useEffect } from "react";
import Flashcard from "./Flashcard";
import Deck from "../../pages/Set";

const FlashcardControl = ({ deck }) => {
  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(1);
  const [term, setTerm] = useState(deck.flashcards[0].term);
  const [definition, setDefinition] = useState(deck.flashcards[0].definition);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const card = deck.flashcards[index - 1];

    setTerm(card.term);
    setDefinition(card.definition);
  }, [index]);

  const flashcardRef = useRef();

  function useInterval(callback, delay) {
    const intervalRef = React.useRef(null);
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    React.useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === "number") {
        intervalRef.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalRef.current);
      }
    }, [delay]);
    return intervalRef;
  }

  function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

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

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        goRight();
      } else if (e.key === "ArrowLeft") {
        goLeft();
      }
    });
  }, []);

  useInterval(() => {
    if (play) {
      if (!flip) {
        toggleFlip();
      } else {
        goRight();
      }
    }
  }, 2000);

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
    if (index != deck.flashcards.length) {
      setIndex(index + 1);
    }
  };

  const goFullRight = () => {
    if (index != deck.flashcards.length) {
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

  return (
    <>
      <div className="controls-container">
        <div className="flashcards-container">
          <Flashcard
            flip={flip}
            setFlip={setFlip}
            flashcard={flashcardRef}
            term={term}
            definition={definition}
          />
        </div>
        <div className="controls">
          <div className="left-controls">
            <button className="button-icon">
              <span className="pi pi-arrow-left"></span>
            </button>
          </div>
          <div className="middle-controls">
            <button
              className="button-icon"
              disabled={index === 1}
              onClick={goFullLeft}
            >
              <span className="pi pi-angle-double-left"></span>
            </button>
            <button
              className="button-icon"
              disabled={index === 1}
              onClick={goLeft}
            >
              <span className="pi pi-angle-left"></span>
            </button>
            <button className="button-icon" onClick={toggleFlip}>
              <span className="pi pi-arrow-up"></span>
            </button>
            <button
              className="button-icon"
              disabled={index === deck.flashcards.length}
              onClick={goRight}
            >
              <span className="pi pi-angle-right"></span>
            </button>
            <button
              className="button-icon"
              disabled={index === deck.flashcards.length}
              onClick={goFullRight}
            >
              <span className="pi pi-angle-double-right"></span>
            </button>
          </div>
          <div className="right-controls">
            <button className="button-icon" onClick={playCards}>
              <span className={play ? "pi pi-pause" : "pi pi-play"}></span>
            </button>
            <button className="button-icon" onClick={shuffle}>
              <span className="pi pi-sync"></span>
            </button>
          </div>
        </div>
        <div className="number">
          <p className="num">
            {index}/{deck.flashcards.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default FlashcardControl;
