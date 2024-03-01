import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import rehypeSanitize from "rehype-sanitize";

const EditDialog = ({ card, set_set, set }) => {
  const [question, setQuestion] = useState(card.term);
  const [answer, setAnswer] = useState(card.definition);
  const [open, setOpen] = useState(false);

  const { flashcards } = set;

  const editCard = () => {
    const new_card = { ...flashcards[card.index] };

    new_card.term = question;
    new_card.definition = answer;

    flashcards[card.index] = new_card;

    set_set({ ...set, flashcards });
    console.log(set);

    setOpen(false);
  };

  return (
    <>
      <div className="card-row">
        <div className="group">
          <div className="card-number">
            <p className="number">{card.index + 1}</p>
          </div>
          <div className="term-container">
            <p className="label">Term</p>
            <p className="term">{card.term}</p>
          </div>
        </div>
        <div className="edit" onClick={() => setOpen(!open)}>
          <span className="pi pi-pencil"></span>
        </div>
      </div>
      <div className={"edit-area " + (open ? "" : "hidden")}>
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
          onClick={editCard}
          disabled={!(question && answer)}
        >
          Save changes
        </button>
      </div>
    </>
  );
};

export default EditDialog;
