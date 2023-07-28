import React from "react";
import "../css/Decks.css";
import Searchbar from "../components/Searchbar";
import Card from "../components/Card";

const Decks = () => {
  return (
    <>
      <div className="page page-1 decks-page-1">
        <h1 className="header">Find public decks</h1>
        <div className="flex-container">
          <Searchbar placeholder="Search for public decks..." />
          <button className="button">
            <span className="pi pi-search"></span>
          </button>
        </div>
        <div className="stats">
          <div className="left-side"></div>
          <div className="right-side"></div>
        </div>
        <div className="recent-decks">
          <h2 className="subheader">Recent decks</h2>
          <div className="cards">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Decks;
