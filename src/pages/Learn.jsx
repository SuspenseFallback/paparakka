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
import useSpeechRecognition from "../hooks/useSpeechRecognition.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import LearnHeader from "../components/Learn/LearnHeader.jsx";
import ChooseDifficulty from "../components/Learn/ChooseDifficulty.jsx";

const Learn = ({ user }) => {
  // hooks
  const navigate = useNavigate();
  const {
    listening,
    startListening,
    stopListening,
    text,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  const { id } = useParams();

  console.log("support", hasRecognitionSupport);

  // state

  const [set, set_set] = useState({});
  const [loading, set_loading] = useState(true);
  const [answered, set_answered] = useState(false);
  const [answer, set_answer] = useState("");
  const [correct, set_correct] = useState("");
  // flashcards that are being studied
  const [study_flashcards, set_study_flashcards] = useState([]);
  // flashcards to be uploaded
  const [flashcards, set_flashcards] = useState([]);

  useEffect(() => {
    set_answer(text);
  }, [text]);

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

  // filter out cards that have not reached the time

  const check_time_of_cards = (cards) => {
    const new_cards = [];

    cards.forEach((card) => {
      if (card.time == undefined) {
        new_cards.push(card);
      } else {
        const now = new Date();

        if (new Date(card.time) < now) {
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
    next_question();
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

  // change the cards that are being studied

  const modify_study_cards = (prof) => {
    const copy = [...study_flashcards];
    const new_card = {
      ...study_flashcards[0],
      proficiency: prof,
      times_revised: study_flashcards[0].time_revised
        ? study_flashcards[0].time_revised + 1
        : 1,
    };
    copy.splice(0, 1);

    console.log(prof);

    if (study_flashcards.length == 1 && prof == "easy") {
      set_study_flashcards([]);
    }

    if (prof == "medium") {
      const length = Math.round(0.6 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "hard") {
      const length = Math.round(0.3 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "again") {
      const length = Math.round(0.1 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    set_study_flashcards(copy);
  };

  // get new proficiency level for a card

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
      if (
        answer === study_flashcards[0].definition ||
        (study_flashcards[0].proficiency &&
          study_flashcards[0].proficiency == "medium")
      ) {
        return "easy";
      } else {
        return "medium";
      }
    }
  };

  // next question

  const next_question = () => {
    const cards = [...flashcards];
    const proficiency = get_new_proficiency(study_flashcards[0]);
    const card_index = study_flashcards[0].index;

    console.log(proficiency);

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
        time = new Date(time.getTime() - 1000 * 60);
        break;
      default:
        break;
    }

    const new_card = {
      ...study_flashcards[0],
      times_revised: study_flashcards[0].times_revised
        ? study_flashcards[0].times_revised + 1
        : 1,
      proficiency: proficiency,
      time: time.toUTCString(),
    };

    console.log(cards[card_index]);

    cards[card_index] = new_card;
    set_flashcards(cards);

    updateStudiedSets(user, set.id, cards, () => {
      set_correct("unknown");
      set_answered(false);
      set_answer("");
      modify_study_cards(proficiency);
    });
  };

  // key events

  onkeydown = (e) => {
    if (e.key === "Enter") {
      check_answer();
    }
  };

  const onOver = () => {
    navigate("/dashboard/");
  };

  // jsx

  return (
    <>
      <div className="page page-1 learn-page-1">
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <>
            {/* header row */}
            <div className="row">
              <h1 className="header">{set.title}</h1>
              <div className="buttons">
                <button
                  className="button-outline"
                  onClick={() => navigate("/flashcards/" + id)}
                >
                  View cards
                </button>
                {set.owner == user.id ? (
                  <button
                    className="button-outline"
                    onClick={() =>
                      window.open("/add-cards/" + id, { target: "_blank" })
                    }
                  >
                    Add cards
                  </button>
                ) : null}
              </div>
            </div>
            {/* layout (main body) */}
            <div className="layout">
              <div className="question-container">
                {study_flashcards.length > 0 ? (
                  <>
                    <LearnHeader
                      answered={answered}
                      study_flashcards={study_flashcards}
                      correct={correct}
                    />

                    <ChooseDifficulty
                      answered={answered}
                      study_flashcards={study_flashcards}
                      correct={correct}
                      set_correct={set_correct}
                      answer={answer}
                    />
                    {listening ? (
                      <p>Your browser is currently listening</p>
                    ) : null}

                    <div className="answer">
                      <p className={"label " + (answered ? "hidden" : "")}>
                        Answer{" "}
                      </p>
                      <div
                        className={
                          "input-container " + (answered ? "answered" : "")
                        }
                      >
                        <div
                          className={
                            "input-row " + (answered ? "answered" : "")
                          }
                        >
                          <textarea
                            type="text"
                            className={"input " + (answered ? "hidden" : "")}
                            placeholder="Enter answer here..."
                            value={answer}
                            onChange={(e) => set_answer(e.target.value)}
                            onKeyDown={(e) => onkeydown(e)}
                          />
                          <button
                            className={
                              "button-icon " + (answered ? "hidden" : "")
                            }
                            onClick={listening ? stopListening : startListening}
                          >
                            <FontAwesomeIcon
                              icon={faMicrophone}
                              color="white"
                            />
                          </button>
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
                    <p className="header">
                      You have completed this set for now.
                    </p>
                    <button className="button" onClick={onOver}>
                      Go back home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Learn;
