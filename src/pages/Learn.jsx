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

import LearnHeader from "../components/Learn/LearnHeader.jsx";
import ChooseDifficulty from "../components/Learn/ChooseDifficulty.jsx";
import Rating from "../components/Rating/Rating.jsx";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

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
      console.log(data);

      addStudiedSets(user, id, (cards) => {
        set_loading(false);

        set_flashcards(cards);
        console.log(cards);
        check_time_of_cards(cards);
      });
    });
  }, [id, user]);

  // filter out cards that have not reached the time

  const check_time_of_cards = (cards) => {
    const new_cards = [];

    cards.forEach((card) => {
      if (!card.time) {
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

    if (prof == "easy1") {
      const length = Math.round(0.7 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "easy2") {
      const length = Math.round(0.6 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "easy3") {
      const length = Math.round(0.5 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "medium1") {
      const length = Math.round(0.4 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "medium2") {
      const length = Math.round(0.3 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "hard1") {
      const length = Math.round(0.2 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    if (prof == "again1") {
      const length = Math.round(0.1 * study_flashcards.length);
      copy.splice(length - 1, 0, new_card);
    }

    set_study_flashcards(copy);
  };

  // get new proficiency level for a card

  const get_new_proficiency = (card) => {
    /*
   The levels are (descending order):

   - again1 - <1m later
   - hard1 - ~3m later
   - medium2 - 10m later
   - medium1 - 30m later
   - easy3 - 1h later
   - easy2 - 4h later
   - easy1 - 1d later

   the lower on the list, the better

    */

    const cur_prof = study_flashcards[0].proficiency;

    if (correct == "wrong") {
      if (answer == "") {
        return "again1";
      } else {
        switch (cur_prof) {
          case "again":
            return "again1";
          case "hard1":
            return "again1";
          case "medium2":
            return "hard2";
          default:
            return "hard1";
        }
      }
    } else {
      if (answer === study_flashcards[0].definition) {
        return "easy2";
      } else {
        switch (cur_prof) {
          case "again1":
            return "hard1";
          case "hard1":
            return "medium2";
          case "medium2":
            return "medium1";
          case "medium1":
            return "easy3";
          case "easy3":
            return "easy2";
          case "easy2":
            return "easy1";
          case "easy1":
            return "easy1";
          default:
            return "medium1";
        }
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
      case "easy1":
        time = new Date(time.getTime() + 1000 * 60 * 60 * 24);
        break;
      case "easy2":
        time = new Date(time.getTime() + 1000 * 60 * 60 * 4);
        break;
      case "easy3":
        time = new Date(time.getTime() + 1000 * 60 * 60);
        break;
      case "medium1":
        time = new Date(time.getTime() + 1000 * 60 * 30);
        break;
      case "medium2":
        time = new Date(time.getTime() + 1000 * 60 * 10);
        break;
      case "hard1":
        time = new Date(time.getTime() + 1000 * 60 * 5);
        break;
      case "again1":
        time = new Date(time.getTime() - 1000 * 1);
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

  // onkeydown = (e) => {
  //   console.log(e);
  //   if (e.key === "Enter") {
  //     check_answer();
  //   }
  // };

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
                <Rating />
                <button
                  className="button-outline"
                  onClick={() => navigate("/flashcards/" + id)}
                >
                  View cards
                </button>
                {set.owner == user.id ? (
                  <button
                    className="button-outline"
                    onClick={() => window.open("/edit/" + id, "_blank")}
                  >
                    Edit cards
                  </button>
                ) : null}
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
                          <MDEditor
                            type="text"
                            className={"input " + (answered ? "hidden" : "")}
                            placeholder="Enter answer here..."
                            value={answer}
                            onChange={set_answer}
                            visibleDragbar={false}
                            previewOptions={{
                              rehypePlugins: [[rehypeSanitize]],
                            }}
                          />
                          <button
                            className={
                              "button-icon " + (answered ? "hidden" : "")
                            }
                            onClick={listening ? stopListening : startListening}
                          >
                            <i className="icon pi pi-microphone"></i>
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
