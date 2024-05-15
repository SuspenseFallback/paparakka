import React, { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

const LearnHeader = ({ answered, study_flashcards, correct }) => {
  // speech
  const [speech, set_speech] = useState(null);
  const [is_playing, set_is_playing] = useState(false);

  const speak = () => {
    if (speechSynthesis.speaking) {
      if (speechSynthesis.paused) {
        return speechSynthesis.resume();
      } else {
        return speechSynthesis.pause();
      }
    }

    let utterance = new SpeechSynthesisUtterance(study_flashcards[0].term);

    utterance.addEventListener("pause", () => {
      set_is_playing(false);
    });

    utterance.addEventListener("resume", () => {
      set_is_playing(true);
    });

    utterance.addEventListener("end", () => {
      set_is_playing(false);
    });

    utterance.rate = 1;
    const spe = speechSynthesis.speak(utterance);
    set_is_playing(true);
    set_speech(spe);
  };
  return (
    <>
      <div className="question-container">
        <div className="column">
          <div className={"top" + (answered ? " hidden" : "")}>
            <span className="label">QUESTION</span>
            <div className="group">
              <button className="button button-icon" onClick={speak}>
                <i className="icon pi pi-volume-up"></i>
              </button>
              <p className={"question "}>
                <MDEditor.Markdown source={study_flashcards[0].term} />
              </p>
            </div>
          </div>
          <div className="bottom">
            <button
              className={"button button-icon " + (answered ? "" : "hidden")}
              id={answered ? correct : ""}
            >
              <span
                className={
                  correct === "wrong"
                    ? "pi pi-times icon"
                    : correct === "correct"
                    ? "pi pi-check icon"
                    : correct === "unknown"
                    ? "pi pi-question icon"
                    : ""
                }
              ></span>
            </button>
          </div>
        </div>
        {/* <div className={"stats-section " + (answered ? "hidden" : "")}>
          <p className="stat">
            Times revised: {study_flashcards[0].times_revised || "0"}
          </p>
          <p className="stat">
            Proficiency: {study_flashcards[0].proficiency || "none"}
          </p>
          <p className="stat">
            Last revised: {study_flashcards[0].time || "never"}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default LearnHeader;
