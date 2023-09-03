import React from "react";
import { Tooltip } from "react-tooltip";

const PreviewCard = ({ cardNumber, term, definition }) => {
  return (
    <div className="card-row">
      <div className="card-number">
        <p className="number">{cardNumber}</p>
      </div>
      <div className="term-container">
        <p className="label">Term</p>
        <p className="term">{term}</p>
      </div>
      <div className="definition-container">
        <p className="label">Definition</p>
        <p className="definition">{definition}</p>
      </div>
    </div>
  );
};

export default PreviewCard;
