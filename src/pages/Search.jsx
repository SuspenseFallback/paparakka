import React, { useEffect, useState } from "react";
import "../css/Decks.css";
import Searchbar from "../components/Searchbar/Searchbar";
import Card from "../components/Card/Card";
import { logData, searchDeckTitles } from "../firebase/firebase";
import { useNavigate } from "react-router";
import LongCard from "../components/Card/LongCard";

const Search = () => {
  const [search, set_search] = useState("");
  const [decks, set_decks] = useState([]);
  const [loading, set_loading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    logData("search");

    document.title = "Flashcards | Search";
  }, []);

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const query = params.get("query");
    set_search(query);

    searchDeckTitles(query, (data) => {
      set_loading(false);
      set_decks(data);
    });
  }, []);

  const searchQuery = () => {
    document.location.href = "/search?query=" + search;
  };

  return (
    <>
      <div className="decks-page-1">
        <h1 className="header">Find public decks</h1>
        <div className="flex-container">
          <Searchbar
            placeholder="Search for public decks..."
            val={search}
            setVal={set_search}
          />
          <button className="button" onClick={searchQuery}>
            <span className="pi pi-search"></span>
          </button>
        </div>
        <div className={"results " + (loading ? "loading" : "")}>
          {loading ? (
            <>
              <span className="pi pi-spinner pi-spin"></span>
            </>
          ) : decks.length > 0 ? (
            decks.map((card) => {
              return (
                <LongCard
                  title={card.title}
                  desc={card.description}
                  tags={card.tags}
                  owner={card.ownerName}
                />
              );
            })
          ) : (
            <>
              <div className="no-results">
                <p className="caption">
                  No results found for this search. Try using filters or a
                  different search.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
