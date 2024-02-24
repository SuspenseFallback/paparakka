import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getSet } from "../firebase/firebase";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import "../css/AddCards.css";

const AddCards = ({ user }) => {
  const [set, set_set] = useState({});
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getSet(id).then((data) => {
      document.title = "Papparakka | Add cards to " + data.title;
      set_set({ ...data });
      console.log(set);
    });
  }, []);

  return (
    <>
      <div className="add-cards-page-1" data-color-mode="light">
        <div className="container">
          <div className="question-container">
            <label htmlFor="question">Question</label>
            <input type="text" name="question" id="question" />
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
      </div>
    </>
  );
};

export default AddCards;
