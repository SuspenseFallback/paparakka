import React from "react";
import { useNavigate, useParams } from "react-router";

const FlashcardControlBar = ({
  index,
  goFullLeft,
  goLeft,
  goRight,
  goFullRight,
  playCards,
  play,
  shuffle,
  toggleFlip,
  flip,
  set,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      {/* controls */}
      <div className="controls">
        {/* leave */}
        <div className="left-controls">
          <button
            className="button-icon"
            onClick={() => navigate("/learn/" + id)}
          >
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
            disabled={index === set.flashcards.length}
            onClick={goRight}
          >
            <span className="pi pi-angle-right"></span>
          </button>
          <button
            className="button-icon"
            disabled={index === set.flashcards.length}
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
    </>
  );
};

export default FlashcardControlBar;
