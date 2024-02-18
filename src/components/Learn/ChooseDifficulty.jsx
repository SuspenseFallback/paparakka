import React from "react";

const ChooseDifficulty = ({
  answered,
  answer,
  study_flashcards,
  correct,
  set_correct,
}) => {
  return (
    <>
      {" "}
      <div className={"answer-container " + (answered ? "" : "hidden")}>
        <div className="your-answer">
          <p className="label">Your answer</p>
          <p className="answer-text">{answer ? answer : <br />}</p>
        </div>
        <div className="correct-answer">
          <p className="label">Correct answer</p>
          <p className="answer-text">{study_flashcards[0].definition}</p>
        </div>
        {correct === "unknown" ? (
          <>
            <p className="choose">How do you think you did?</p>
            <div className="button-group">
              <div
                className={"button " + (correct === "correct" ? "active" : "")}
                onClick={() => set_correct("correct")}
              >
                Correct
              </div>
              <div
                className={"button " + (correct === "wrong" ? "active" : "")}
                onClick={() => set_correct("wrong")}
              >
                Wrong
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ChooseDifficulty;
