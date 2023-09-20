import React, { useEffect, useState } from "react";
import { addStudiedSets, getSet, logData } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router";
// import shuffle from "../helpers/shuffle.js";
import "../css/Learn.css";

const Learn = ({ user }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [index, set_index] = useState(0);
  const [set, set_set] = useState({});
  const [loading, set_loading] = useState(true);
  const [answered, set_answered] = useState(false);
  const [answer, set_answer] = useState("");
  const [difficulty, set_difficulty] = useState("");
  const [correct, set_correct] = useState("");
  const [history, set_history] = useState([]);
  const [flashcards, set_flashcards] = useState([]);

  useEffect(() => {
    getSet(id).then((data) => {
      set_set(data);
      document.title = "Flashcards | " + data.title;
      logData("dictate - " + data.id);
      

      addStudiedSets(user, data.id, () => {
        set_loading(false);
        set_flashcards(data.flashcards);
      })
    });
  }, [id]);

  const check_answer = () => {
    const current_answer = flashcards[index].definition;
    set_answered(true);
    if (answer === "") {
      set_correct("wrong");
    } else if (answer === current_answer) {
      set_correct("correct");
    } else {
      set_correct("unknown");
    }
  };

  const dont_know = () => {
    set_answer("");
    check_answer();
  };

  const next_question = () => {
    const new_history = [...history];
    new_history.push({
      index: flashcards[index].index,
      term: flashcards[index].term,
      definition: flashcards[index].definition,
      proficiency: difficulty,
    });

    set_history(new_history);

    if (index === flashcards.length - 1) {
      return navigate(`/preview/${set.id}`);
    }

    set_correct("unknown");
    set_index((i) => i + 1);
    set_answered(false);
    set_difficulty("");
    set_answer("");
  };

  onkeydown = (e) => {
    if (e.key === "Enter") {
      check_answer();
    }
  };

  return (
    <>
      <div className="page page-1 learn-page-1">
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <div className="question-container">
            <div className="top">
              <div className="left">
                <p className={"question " + (answered ? " hidden" : "")}>
                  <span className="label">TERM</span>
                  <br />
                  <span className="term">{flashcards[index].term}</span>
                </p>
              </div>
              <div className="center">
                <button
                  className={
                    "button button-icon " + (answered ? correct : "hidden")
                  }
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
            <div className={"answer-container " + (answered ? "" : "hidden")}>
              <div className="your-answer">
                <p className="label">Your answer</p>
                <p className="answer-text">{answer ? answer : <br />}</p>
              </div>
              <div className="correct-answer">
                <p className="label">Correct answer</p>
                <p className="answer-text">{flashcards[index].definition}</p>
              </div>
              {correct === "unknown" ? (
                <>
                  <p className="choose">How do you think you did?</p>
                  <div className="button-group">
                    <div
                      className={
                        "button " + (correct === "correct" ? "active" : "")
                      }
                      onClick={() => set_correct("correct")}
                    >
                      Correct
                    </div>
                    <div
                      className={
                        "button " + (correct === "wrong" ? "active" : "")
                      }
                      onClick={() => set_correct("wrong")}
                    >
                      Wrong
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div className="answer">
              <div className="input-container">
                <p className={"label " + (answered ? "hidden" : "")}>
                  Answer{" "}
                  <span className="dn" onClick={dont_know}>
                    Don't know?
                  </span>
                </p>
                <div className={"input-row " + (answered ? "answered" : "")}>
                  <input
                    type="text"
                    className={"input " + (answered ? "hidden" : "")}
                    placeholder="Enter answer here..."
                    value={answer}
                    onChange={(e) => set_answer(e.target.value)}
                    onKeyDown={(e) => onkeydown(e)}
                  />
                  <button
                    className={
                      "button " + (answered ? "button-block" : "button-icon")
                    }
                    onClick={answered ? next_question : check_answer}
                    disabled={answered ? correct === "unknown" : false}
                  >
                    {answered ? "Next" : ""}
                    <span className="pi pi-reply icon"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
