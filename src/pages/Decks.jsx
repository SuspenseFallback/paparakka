import React, { useEffect, useState } from "react";
import "../css/Decks.css";
import Searchbar from "../components/Searchbar/Searchbar";
import Card from "../components/Card/Card";
import { logData } from "../firebase/firebase";

const Decks = () => {
  const [search, set_search] = useState("");

  useEffect(() => {
    logData("decks");

    document.title = "Flashcards | Decks";
  }, []);

  useEffect(() => {
    console.log(search);
  }, [search]);

  const searchQuery = () => {
    document.location.href = "/search?query=" + search;
  };

  return (
    <>
      <div className="page page-1 decks-page-1">
        <h1 className="header">Find public decks</h1>
        <div className="flex-container">
          <Searchbar
            placeholder="Search for public decks..."
            val={search}
            setVal={set_search}
            searchQuery={searchQuery}
          />
          <button className="button" onClick={searchQuery}>
            <span className="pi pi-search"></span>
          </button>
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
