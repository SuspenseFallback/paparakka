import React, { useEffect, useState } from "react";
import {
  addStudiedSets,
  getSet,
  logData,
  updateStudiedSets,
} from "../firebase/firebase";
import { useNavigate, useParams } from "react-router";
// import shuffle from "../helpers/shuffle.js";
import "../css/Learn.css";

const Learn = ({ user }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [set, set_set] = useState({});
  const [index, set_index] = useState(0);

  const [loading, set_loading] = useState(true);

  const [modified_flashcards, set_modified_flashcards] = useState([]);
  const [flashcards, set_flashcards] = useState([]);

  const [answered, set_answered] = useState(false);
  const [answer, set_answer] = useState("");
  const [correct, set_correct] = useState("");

  useEffect(() => {
    getSet(id).then((data) => {
      document.title = "Flashcards | " + data.title;
      set_set({ ...data });

      addStudiedSets(user, data.id, (cards) => {
        set_flashcards(cards);
        set_modified_flashcards(cards);
        set_loading(false);
        sort_by_proficiency(cards);
      });
    });
  }, [id, user]);

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

  const sort_by_proficiency = (cards) => {
    const unknown = [];
    const easy = [];
    const medium = [];
    const hard = [];

    cards.forEach((card) => {
      let is_7_days_ahead = false;
      let is_2_days_ahead = false;
      let is_1_days_ahead = false;

      const today = new Date();
      const card_time = card.time ? new Date(card.time) : new Date();
      const seven_days_ahead = card_time + 7 * 24 * 60 * 60;
      const two_days_ahead = card_time + 2 * 24 * 60 * 60;
      const one_days_ahead = card_time + 1 * 24 * 60 * 60;

      if (seven_days_ahead < today) {
        is_7_days_ahead = true;
      }
      if (two_days_ahead < today) {
        is_2_days_ahead = true;
      }
      if (one_days_ahead < today) {
        is_1_days_ahead = true;
      }

      if (!card.proficiency) {
        unknown.push(card);
      } else if (card.proficiency === "easy") {
        if (is_7_days_ahead) {
          easy.push(card);
        }
      } else if (card.proficiency === "medium") {
        if (is_2_days_ahead) {
          medium.push(card);
        }
      } else if (card.proficiency === "hard") {
        if (is_1_days_ahead) {
          hard.push(card);
        }
      }
    });

    const total = [...unknown, ...easy, ...medium, ...hard];
    console.log("proficiency sorted -", total);
    set_flashcards(total);
  };

  const get_new_proficiency = (card) => {
    if (!card.proficiency) {
      if (correct === "correct") {
        return "medium";
      } else {
        return "hard";
      }
    }

    if (correct === "wrong") {
      if (card.proficiency === "hard") {
        return "hard";
      } else if (card.proficiency === "medium") {
        return "hard";
      } else if (card.proficiency === "easy") {
        return "medium";
      }
    } else {
      if (card.proficiency === "hard") {
        return "medium";
      } else if (card.proficiency === "medium") {
        return "easy";
      } else if (card.proficiency === "easy") {
        return "easy";
      }
    }
  };

  const next_question = () => {
    // set cards

    let cards = [...modified_flashcards];
    const cards_index = index;
    const new_prof = get_new_proficiency(cards[cards_index]);

    const new_card = {
      ...cards[cards_index],
      proficiency: new_prof,
      time: new Date().toTimeString(),
    };

    console.log("index - ", index);
    console.log("new card - ", new_card);

    cards = cards.filter((card) => card.index !== new_card.index);
    cards.push(new_card);

    console.log("cards - ", cards);

    set_modified_flashcards(cards);
    sort_by_proficiency(cards);

    updateStudiedSets(user, set.id, cards, () => {
      set_correct("unknown");
      set_answered(false);
      set_answer("");
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
            {flashcards.length > 0 ? (
              <>
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
                      {flashcards[index].definition}
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
