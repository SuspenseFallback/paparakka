import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Flashcard from "./Flashcard";
import randint from "../../helpers/random.js";
import { gsap } from "gsap";

const FlashcardControl = ({ deck }) => {
  // state

  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(1);
  const [term, setTerm] = useState(deck.flashcards[0].term);
  const [definition, setDefinition] = useState(deck.flashcards[0].definition);
  const [play, setPlay] = useState(false);

  const flashcardRef = useRef();

  const animLeft = () => {
    const ctx = gsap.context(() => {
      const element = flashcardRef.current;
      const tl = gsap.timeline();

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 0,
          x: -200,
          duration: 0.25,
        }
      );

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 0,
          x: 400,
          duration: 0.01,
        },
        ">+=0.25"
      );

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
        },
        ">+=0.25"
      );
    }, flashcardRef);

    return () => ctx.revert();
  };

  const animFlip = () => {
    const ctx = gsap.context(() => {
      const element = flashcardRef.current;
      const tl = gsap.timeline();

      if (flip) {
        tl.to(
          document.querySelector(
            ".controls-container .flashcards-container .flashcard"
          ),
          {
            rotateZ: 180,
            duration: 0.25,
          }
        );
      } else {
        tl.to(
          document.querySelector(
            ".controls-container .flashcards-container .flashcard"
          ),
          {
            rotateZ: 0,
            duration: 0.25,
          }
        );
      }
    }, flashcardRef);

    return () => ctx.revert();
  };

  const animRight = () => {
    const ctx = gsap.context(() => {
      const element = flashcardRef.current;
      const tl = gsap.timeline();

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 0,
          x: 200,
          duration: 0.25,
        }
      );

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 0,
          x: -400,
          duration: 0.01,
        },
        ">+=0.25"
      );

      tl.to(
        document.querySelector(
          ".controls-container .flashcards-container .flashcard"
        ),
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
        },
        ">+=0.25"
      );
    }, flashcardRef);

    return () => ctx.revert();
  };

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
    animLeft();
  };

  const goRight = () => {
    if (index !== deck.flashcards.length) {
      setIndex(index + 1);
    }
    animRight();
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

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        goRight();
      } else if (e.key === "ArrowLeft") {
        goLeft();
      }
    });
  }, [goLeft, goRight]);

  useInterval(() => {
    if (play) {
      if (!flip) {
        toggleFlip();
      } else {
        goRight();
      }
    }
  }, 2000);

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
        {/* controls */}
        <div className="controls">
          {/* leave */}
          <div className="left-controls">
            <button className="button-icon">
              <span className="pi pi-arrow-left"></span>
            </button>
          </div>
          {/* movement control */}
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
          {/* play and shuffle */}
          <div className="right-controls">
            <button className="button-icon" onClick={playCards}>
              <span className={play ? "pi pi-pause" : "pi pi-play"}></span>
            </button>
            <button className="button-icon" onClick={shuffle}>
              <span className="pi pi-sync"></span>
            </button>
          </div>
        </div>
        {/* flashcard index */}
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
