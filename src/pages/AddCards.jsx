import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getSet, updateSet } from "../firebase/firebase";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import rehypeSanitize from "rehype-sanitize";
import "../css/AddCards.css";

const AddCards = ({ user }) => {
  const [set, set_set] = useState({});
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getSet(id).then((data) => {
      document.title = "Papparakka | Add cards to " + data.title;
      set_set({ ...data });
      setLoading(false);
    });
  }, []);

  const addCard = () => {
    const card = {
      times_revised: 0,
      term: question,
      definition: answer,
      index: set.flashcards.length,
      proficiency: "hard",
    };

    const flashcards = [...set.flashcards];
    flashcards.push(card);
    const new_set = { ...set, flashcards };

    set_set(new_set);
    updateSet(new_set, set.id, user).then(() => {
      setQuestion("");
      setAnswer("");
    });
  };

  return (
    <>
      <div className="add-cards-page-1" data-color-mode="light">
        {loading ? (
          <i className="pi pi-spin pi-spinner"></i>
        ) : (
          <>
            <div className="container">
              <div className="question-container">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  name="question"
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div className="answer-container">
                <p className="label">Answer</p>
                <div className="editor-container">
                  <MDEditor
                    value={answer}
                    height="100%"
                    onChange={setAnswer}
                    visibleDragbar={false}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className="button button-block"
              onClick={addCard}
              disabled={!(question && answer)}
            >
              Add card
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddCards;
