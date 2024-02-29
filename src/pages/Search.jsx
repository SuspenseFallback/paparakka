import React, { useEffect, useState } from "react";
import "../css/Sets.css";
import Searchbar from "../components/Searchbar/Searchbar";
import { logData, searchSetTitles } from "../firebase/firebase";
import { useNavigate } from "react-router";
import LongCard from "../components/Card/LongCard";

const Search = () => {
  const [search, set_search] = useState("");
  const [sets, set_sets] = useState([]);
  const [loading, set_loading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    logData("search");

    document.title = "Papparakka | Search";
  }, []);

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const query = params.get("query");
    set_search(query);

    searchSetTitles(query, (data) => {
      set_loading(false);
      set_sets(data);
    });
  }, []);

  const searchQuery = () => {
    document.location.href = "/search?query=" + search;
  };

  return (
    <>
      <div className="sets-page-1">
        <h1 className="header">Find public sets</h1>
        <div className="flex-container">
          <Searchbar
            placeholder="Search for public sets..."
            val={search}
            setVal={set_search}
            searchQuery={searchQuery}
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
          ) : sets.length > 0 ? (
            sets.map((card) => {
              console.log(card);
              return (
                <LongCard
                  title={card.title}
                  desc={card.description}
                  tags={card.tags}
                  owner={card.ownerName}
                  id={card.id}
                  length={card.flashcards.length}
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
