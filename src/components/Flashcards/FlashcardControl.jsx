import React, { useState, useRef, useEffect } from "react";
import Flashcard from "./Flashcard";

const FlashcardControl = () => {
  const [flip, setFlip] = useState(false);
  const [play, setPlay] = useState(false);

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
      if (flip) {
        goRight();
      } else {
        toggleFlip();
      }
    }
  }, 4000);

  const toggleFlip = () => {
    setFlip(!flip);
  };

  const goFullLeft = () => {
    setFlip(false);
    flashcardRef.current.classList.add("full-left-placeholder");
    setTimeout(() => {
      flashcardRef.current.classList.remove("full-left-placeholder");
    }, 500);
  };

  const goLeft = () => {
    setFlip(false);
    flashcardRef.current.classList.add("left-placeholder");
    setTimeout(() => {
      flashcardRef.current.classList.remove("left-placeholder");
    }, 500);
  };

  const goRight = () => {
    setFlip(false);
    flashcardRef.current.classList.add("right-placeholder");
    setTimeout(() => {
      flashcardRef.current.classList.remove("right-placeholder");
    }, 500);
  };

  const goFullRight = () => {
    setFlip(false);
    flashcardRef.current.classList.add("full-right-placeholder");
    setTimeout(() => {
      flashcardRef.current.classList.remove("full-right-placeholder");
    }, 500);
  };

  const playCards = () => {
    setPlay(!play);
  };

  return (
    <>
      <div className="controls-container">
        <div className="flashcards-container">
          <Flashcard flip={flip} setFlip={setFlip} flashcard={flashcardRef} />
        </div>
        <div className="controls">
          <div className="left-controls">
            <button className="button-icon">
              <span className="pi pi-arrow-left"></span>
            </button>
          </div>
          <div className="middle-controls">
            <button className="button-icon" onClick={goFullLeft}>
              <span className="pi pi-angle-double-left"></span>
            </button>
            <button className="button-icon" onClick={goLeft}>
              <span className="pi pi-angle-left"></span>
            </button>
            <button className="button-icon" onClick={toggleFlip}>
              <span className="pi pi-arrow-up"></span>
            </button>
            <button className="button-icon" onClick={goRight}>
              <span className="pi pi-angle-right"></span>
            </button>
            <button className="button-icon" onClick={goFullRight}>
              <span className="pi pi-angle-double-right"></span>
            </button>
          </div>
          <div className="right-controls">
            <button className="button-icon" onClick={playCards}>
              <span className="pi pi-play"></span>
            </button>
            <button className="button-icon">
              <span className="pi pi-sync"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashcardControl;
