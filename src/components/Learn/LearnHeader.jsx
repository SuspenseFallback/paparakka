import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const LearnHeader = ({ answered, study_flashcards, correct }) => {
  return (
    <>
      <div className="top">
        <div className="row">
          <div className={"left" + (answered ? " hidden" : "")}>
            <span className="label">QUESTION</span>
            <div className="group">
              <button className="button button-icon">
                <FontAwesomeIcon icon={faVolumeHigh} color="white" />
              </button>
              <p className={"question "}>
                <span className="term">{study_flashcards[0].term}</span>
              </p>
            </div>
          </div>
          <div className="center">
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
          <div className="right">
            <button
              className={"button button-icon " + (answered ? "hidden" : "")}
            >
              <span className={"pi pi-cog icon"}></span>
            </button>
          </div>
        </div>
        <div className={"stats-section " + (answered ? "hidden" : "")}>
          <p className="stat">
            Times revised: {study_flashcards[0].times_revised || "0"}
          </p>
          <p className="stat">
            Proficiency: {study_flashcards[0].proficiency || "none"}
          </p>
          <p className="stat">
            Last revised: {study_flashcards[0].time || "never"}
          </p>
        </div>
      </div>
    </>
  );
};

export default LearnHeader;
