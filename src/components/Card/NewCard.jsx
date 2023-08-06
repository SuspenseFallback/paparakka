import React from "react";
import { Tooltip } from "react-tooltip";

const NewCard = ({ cardNumber, updateCard, duplicate, deleteCard, cards }) => {
  const changeTerm = (e) => {
    updateCard({
      term: e.target.value,
      definition: cards[cardNumber - 1].definition,
    });
  };

  const changeDefinition = (e) => {
    updateCard({
      term: cards[cardNumber - 1].term,
      definition: e.target.value,
    });
  };

  const flip = () => {
    const term = cards[cardNumber - 1].term;
    const definition = cards[cardNumber - 1].definition;

    updateCard({ term: definition, definition: term });
  };

  return (
    <div className="card-row">
      <div className="card-number">
        <p className="number">{cardNumber}</p>
      </div>
      <div className="input-container">
        <p className="label">Term</p>
        <input
          type="text"
          className="input"
          placeholder="Enter term here..."
          value={cards[cardNumber - 1].term}
          onChange={(e) => changeTerm(e)}
        />
      </div>
      <div className="input-container">
        <p className="label">Definition</p>
        <input
          type="text"
          className="input"
          placeholder="Enter definition here..."
          value={cards[cardNumber - 1].definition}
          onChange={(e) => changeDefinition(e)}
        />
      </div>
      <div className="options">
        <span
          className="icon pi pi-arrows-h"
          data-tooltip-id="flip"
          data-tooltip-content="Flip"
          data-tooltip-place="top"
          onClick={flip}
        ></span>
        <Tooltip id="flip" closeOnScroll={true} closeOnResize={true} />
        <span
          className="icon pi pi-image"
          data-tooltip-id="image"
          data-tooltip-content="Add image"
          data-tooltip-place="top"
        ></span>
        <Tooltip id="image" closeOnScroll={true} closeOnResize={true} />
        <span
          className="icon pi pi-clone"
          data-tooltip-id="clone"
          data-tooltip-content="Duplicate"
          data-tooltip-place="top"
          onClick={duplicate}
        ></span>
        <Tooltip id="clone" closeOnScroll={true} closeOnResize={true} />
        <span
          className={
            "icon pi pi-trash" + (cards.length === 1 ? " disabled" : "")
          }
          data-tooltip-id={cards.length === 1 ? "" : "trash"}
          data-tooltip-content={cards.length === 1 ? "" : "Delete"}
          data-tooltip-place="top"
          onClick={cards.length === 1 ? null : deleteCard}
        ></span>
        <Tooltip id="trash" closeOnScroll={true} closeOnResize={true} />
      </div>
    </div>
  );
};

export default NewCard;
