import React from "react";
import "./Card.css";
import { useNavigate } from "react-router";

const Card = ({ title, desc, tags, owner, id }) => {
  const navigate = useNavigate();

  const preview = () => {
    navigate("/preview/" + id);
  };

  return (
    <>
      <div className="card">
        <div className="top">
          <p className="title" onClick={preview}>
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
    </>
  );
};

export default Card;
