import React from "react";
import "./Card.css";
import { useNavigate } from "react-router";

const LongCard = ({ title, desc, tags, owner, id }) => {
  const navigate = useNavigate();

  const goPreview = () => {
    navigate("/preview/" + id);
  };

  return (
    <div className="long-card">
      <div className="left">
        <div className="top">
          <p className="title" onClick={goPreview}>
            {title}
          </p>
          <p className="desc">{desc}</p>
        </div>
        <div className="bottom">
          <p className="tags">
            {tags.map((tag) => (
              <span className="tag">{tag}</span>
            ))}
          </p>
          <p className="created-by">
            Created by <span>{owner}</span>
          </p>
        </div>
      </div>
      <div className="right">
        <div className="row">
          <button className="button">Flashcards</button>
          <button className="button">Learn</button>
          <button className="button">Dictation</button>
          <button className="button">Test</button>
        </div>
      </div>
    </div>
  );
};

export default LongCard;
