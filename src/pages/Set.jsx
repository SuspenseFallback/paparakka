import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getSet, addHistory } from "../firebase/firebase";
import "../css/Preview.css";
import FlashcardControl from "../components/Flashcards/FlashcardControl";
import PreviewCard from "../components/Card/PreviewCard";
import ScrollUp from "../components/ScrollUp/ScrollUp";

const Set = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [set, set_set] = useState({});
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    getSet(id).then((data) => {
      console.log(data);
      set_loading(false);
      set_set(data);
      document.title = "Papparakka | " + data.title;
      addHistory(data.id);
    });
  }, []);

  const goFlashcards = () => {
    navigate("/flashcards/" + set.id);
  };

  const goDictate = () => {
    navigate("/dictate/" + set.id);
  };

  const goLearn = () => {
    navigate("/learn/" + set.id);
  };

  return (
    <>
      <ScrollUp limit={500} />
      <div
        className={"page page-1 preview-page-1" + (loading ? " loading" : "")}
      >
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <>
            <div className="header">
              <div className="left-side">
                <h1 className="title">{set.title}</h1>
                <p className="description">{set.description}</p>
              </div>
              <div className="right-side">
                <div className="tags">
                  {set.tags.map((tag) => {
                    return (
                      <span className="tag" key={tag + "eoirnv ueim"}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <p className="created-by">
                  created by <span>{set.ownerName}</span>
                </p>
              </div>
            </div>

            <div className="preview-container">
              <div className="buttons">
                <button className="learn-button" onClick={goFlashcards}>
                  Flashcards
                </button>
                <button className="learn-button" onClick={goDictate}>
                  Dictate
                </button>
                <button className="learn-button" onClick={goLearn}>
                  Learn
                </button>
              </div>
              <FlashcardControl set={set} />
            </div>
          </>
        )}
      </div>
      <div className="preview-page-2">
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <>
            <div className="cards">
              {set.flashcards.map((card, index) => {
                return (
                  <PreviewCard
                    cardNumber={index + 1}
                    term={card.term}
                    definition={card.definition}
                    key={index + 1234567}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Set;
