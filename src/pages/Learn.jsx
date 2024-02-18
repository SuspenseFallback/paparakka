import React, { useEffect, useState } from "react";
import {
  addStudiedSets,
  getSet,
  logData,
  updateStudiedSets,
} from "../firebase/firebase";
import { useNavigate, useParams } from "react-router";
import shuffle from "../helpers/shuffle.js";
import "../css/Learn.css";

const Learn = ({ user }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [set, set_set] = useState({});

  const [loading, set_loading] = useState(true);

  // flashcards that are being studied
  const [study_flashcards, set_study_flashcards] = useState([]);

  // flashcards to be uploaded
  const [flashcards, set_flashcards] = useState([]);

  const [answered, set_answered] = useState(false);
  const [answer, set_answer] = useState("");
  const [correct, set_correct] = useState("");

  useEffect(() => {
    getSet(id).then((data) => {
      document.title = "Papparakka | " + data.title;
      set_set({ ...data });

      addStudiedSets(user, data.id, (cards) => {
        set_loading(false);

        set_flashcards(cards);
        check_time_of_cards(cards);
      });
    });
  }, [id, user]);

  const check_time_of_cards = (cards) => {
    const new_cards = [];

    cards.forEach((card) => {
      if (card.time == undefined) {
        new_cards.push(card);
      } else {
        const now = new Date();

        if (card.time < now) {
          new_cards.push(card);
        }
      }
    });

    set_study_flashcards(shuffle(new_cards));
  };

  // triggered when user doesn't know the answer
  const dont_know = () => {
    set_answer("");
    check_answer();
  };

  const check_answer = () => {
    const current_answer = study_flashcards[0].definition;
    set_answered(true);
    if (answer === "") {
      set_correct("wrong");
    } else if (answer === current_answer) {
      set_correct("correct");
    } else {
      set_correct("unknown");
    }
  };

  const modify_study_cards = (prof) => {
    const copy = [...study_flashcards];
    copy.splice(0, 1);

    if (study_flashcards.length == 1) {
      return;
    }

    console.log(copy);

    if (copy.length == 0) {
      return set_study_flashcards([]);
    }

    if (prof == "medium") {
      const length = Math.round(0.6 * study_flashcards.length);
      copy.splice(length - 1, 0, study_flashcards[0]);
    }

    if (prof == "hard") {
      const length = Math.round(0.3 * study_flashcards.length);
      copy.splice(length - 1, 0, study_flashcards[0]);
    }

    if (prof == "again") {
      const length = Math.round(0.1 * study_flashcards.length);
      copy.splice(length - 1, 0, study_flashcards[0]);
    }

    set_study_flashcards(copy);
  };

  const get_new_proficiency = (card) => {
    /*
    4 levels:

    - Easy
    - Medium
    - Hard
    - Again

    */

    if (correct == "wrong") {
      if (answer == "") {
        return "again";
      } else {
        return "hard";
      }
    }

    if (correct == "correct") {
      if (answer === study_flashcards[0].definition) {
        return "easy";
      } else {
        return "medium";
      }
    }
  };

  const next_question = () => {
    const cards = [...flashcards];
    const proficiency = get_new_proficiency(study_flashcards[0]);
    const card_index = study_flashcards[0].index;

    let time = new Date();

    switch (proficiency) {
      case "easy":
        time = new Date(time.getTime() + 1000 * 60 * 60 * 24 * 2);
        break;
      case "medium":
        time = new Date(time.getTime() + 1000 * 60 * 60 * 24);
        break;
      case "hard":
        time = new Date(time.getTime() + 1000 * 60 * 60 * 4);
        break;
      case "again":
        time = new Date(time.getTime() + 1000 * 60 * 10);
        break;
      default:
        break;
    }

    const new_card = {
      ...study_flashcards[0],
      proficiency: proficiency,
      time: time.toUTCString(),
    };

    cards[card_index] = new_card;
    set_flashcards(cards);

    updateStudiedSets(user, set.id, cards, () => {
      set_correct("unknown");
      set_answered(false);
      set_answer("");
      modify_study_cards(proficiency);
    });
  };

  onkeydown = (e) => {
    if (e.key === "Enter") {
      check_answer();
    }
  };

  const onOver = () => {
    navigate("/preview/" + id);
  };

  return (
    <>
      <div className="page page-1 learn-page-1">
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <div className="question-container">
            {study_flashcards.length > 0 ? (
              <>
                <div className="top">
                  <div className="left">
                    <p className={"question " + (answered ? " hidden" : "")}>
                      <span className="label">TERM</span>
                      <br />
                      <span className="term">{study_flashcards[0].term}</span>
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
                      className={
                        "button button-icon " + (answered ? "hidden" : "")
                      }
                    >
                      <span className={"pi pi-cog icon"}></span>
                    </button>
                  </div>
                </div>
                <div
                  className={"answer-container " + (answered ? "" : "hidden")}
                >
                  <div className="your-answer">
                    <p className="label">Your answer</p>
                    <p className="answer-text">{answer ? answer : <br />}</p>
                  </div>
                  <div className="correct-answer">
                    <p className="label">Correct answer</p>
                    <p className="answer-text">
                      {study_flashcards[0].definition}
                    </p>
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
                    <div
                      className={"input-row " + (answered ? "answered" : "")}
                    >
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
                          "button " +
                          (answered ? "button-block" : "button-icon")
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
              </>
            ) : (
              <div className="center">
                <p className="header">You have learned everything for now!</p>
                <button className="button" onClick={onOver}>
                  Go back to set
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
