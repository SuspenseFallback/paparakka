import React, { useEffect, useState } from "react";
import { getSet, logData } from "../firebase/firebase";
import { useParams } from "react-router";
import shuffle from "../helpers/shuffle.js";
import "../css/Dictate.css";

const Dictate = ({ user }) => {
  const { id } = useParams();
  const [index, set_index] = useState(0);
  const [hint_displayed, set_hint_displayed] = useState(false);
  const [speech, set_speech] = useState(null);
  const [is_playing, set_is_playing] = useState(false);
  const [deck, set_deck] = useState({});
  const [loading, set_loading] = useState(true);
  const [answered, set_answered] = useState(false);
  const [answer, set_answer] = useState("");
  const [difficulty, set_difficulty] = useState("");
  const [active_speed, set_active_speed] = useState(1);
  const [count, set_count] = useState({ easy: 0, medium: 0, hard: 0 });
  const [history, set_history] = useState([]);

  useEffect(() => {
    getSet(id).then((data) => {
      set_deck(data);
      set_loading(false);
      document.title = "Flashcards | " + data.title;
      logData("dictate - " + data.id);
    });
  }, [id]);

  const speak = () => {
    if (speechSynthesis.speaking) {
      if (speechSynthesis.paused) {
        return speechSynthesis.resume();
      } else {
        return speechSynthesis.pause();
      }
    }

    let utterance = new SpeechSynthesisUtterance(deck.flashcards[index].term);

    utterance.addEventListener("pause", () => {
      set_is_playing(false);
    });

    utterance.addEventListener("resume", () => {
      set_is_playing(true);
    });

    utterance.addEventListener("end", () => {
      set_is_playing(false);
    });

    utterance.rate = active_speed === 1 ? 0.8 : 0.5;
    const spe = speechSynthesis.speak(utterance);
    set_is_playing(true);
    set_speech(spe);
  };

  const check_answer = () => {
    const current_answer = deck.flashcards[index].definition;
    set_answered(true);
    if (answer === "") {
      set_difficulty("hard");
    } else if (answer.length < current_answer.length / 3) {
      set_difficulty("hard");
    } else if (answer.toLowerCase() === current_answer.toLowerCase()) {
      set_difficulty(hint_displayed ? "medium" : "easy");
    } else if (
      current_answer.toLowerCase().includes(answer.toLowerCase()) &&
      answer.length > current_answer.length / 2
    ) {
      set_difficulty(hint_displayed ? "medium" : "easy");
    } else {
      set_difficulty("unknown");
    }
  };

  const dont_know = () => {
    set_answer("");
    check_answer();
  };

  const next_question = () => {
    set_history((h) => [
      ...h,
      {
        index: deck.flashcards[index].index,
        difficulty: difficulty,
      },
    ]);
    set_index((i) => i + 1);
    set_hint_displayed(false);
    set_answered(false);
    set_difficulty("");
    set_answer("");
  };

  return (
    <>
      <div className="page page-1 dictate-page-1">
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <div className="question-container">
            <div className="top">
              <div className="left">
                <p
                  className={
                    "question " +
                    (hint_displayed ? "" : "blur") +
                    (answered ? " hidden" : "")
                  }
                >
                  <span className="label">TERM</span>
                  <br />
                  <span className="term">
                    {hint_displayed ? deck.flashcards[index].term : "hint?"}
                  </span>
                </p>
              </div>
              <div className="right">
                <button
                  className={
                    "button button-icon " + (answered ? difficulty : "")
                  }
                  onClick={speak}
                >
                  <span
                    className={
                      difficulty === "hard"
                        ? "pi pi-times icon"
                        : difficulty === "easy"
                        ? "pi pi-check icon"
                        : difficulty === "medium"
                        ? "pi pi-ellipsis-h icon"
                        : difficulty === "unknown"
                        ? "pi pi-question icon"
                        : !is_playing
                        ? "pi pi-play icon"
                        : "pi pi-pause icon"
                    }
                  ></span>
                </button>
              </div>
              <div className="controls">
                <button
                  className={"button" + (answered ? " hidden" : "")}
                  disabled={hint_displayed}
                  onClick={() => set_hint_displayed(true)}
                >
                  Get a hint
                </button>
                <div className={"button-group" + (answered ? " hidden" : "")}>
                  <button
                    className={"button " + (active_speed === 1 ? "active" : "")}
                    onClick={() => set_active_speed(1)}
                  >
                    Normal
                  </button>
                  <button
                    className={"button " + (active_speed === 2 ? "active" : "")}
                    onClick={() => set_active_speed(2)}
                  >
                    Slowed
                  </button>
                </div>
              </div>
            </div>
            <div className={"answer-container " + (answered ? "" : "hidden")}>
              <div className="your-answer">
                <p className="label">Your answer</p>
                <p className="answer-text">{answer ? answer : <br />}</p>
              </div>
              <div className="correct-answer">
                <p className="label">Correct answer</p>
                <p className="answer-text">
                  {deck.flashcards[index].definition}
                </p>
              </div>
              {difficulty === "unknown" ? (
                <>
                  <p className="choose">How do you think you did?</p>
                  <div className="button-group">
                    <div
                      className={
                        "button " + (difficulty === "easy" ? "active" : "")
                      }
                      onClick={() => set_difficulty("easy")}
                    >
                      Easy
                    </div>
                    <div
                      className={
                        "button " + (difficulty === "medium" ? "active" : "")
                      }
                      onClick={() => set_difficulty("medium")}
                    >
                      Medium
                    </div>
                    <div
                      className={
                        "button " + (difficulty === "hard" ? "active" : "")
                      }
                      onClick={() => set_difficulty("hard")}
                    >
                      Hard
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
                  />
                  <button
                    className={
                      "button " + (answered ? "button-block" : "button-icon")
                    }
                    onClick={answered ? next_question : check_answer}
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

export default Dictate;
