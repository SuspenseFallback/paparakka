import React, { useEffect, useState } from "react";
import "../css/Decks.css";
import Searchbar from "../components/Searchbar/Searchbar";
import Card from "../components/Card/Card";
import { getUser, logData } from "../firebase/firebase";

const Decks = () => {
  const [search, set_search] = useState("");
  const [user, set_user] = useState("");
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    logData("decks");

    document.title = "Flashcards | Decks";
  }, []);

  useEffect(() => {
    getUser((data) => {
      set_user(data);
      set_loading(false);
    });
  }, []);

  useEffect(() => {
    console.log(search);
  }, [search]);

  const searchQuery = () => {
    document.location.href = "/search?query=" + search;
  };

  return (
    <>
      <div className={"page page-1 decks-page-1" + (loading ? " loading" : "")}>
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <>
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
              <h2 className="subheader">Recent Decks</h2>
              <div className="cards">
                {user.history.length > 3
                  ? user.history.slice(0, 3).map((card) => {
                      return (
                        <Card
                          key={card.id}
                          title={card.title}
                          desc={card.description}
                          owner={card.ownerName}
                          tags={card.tags}
                          id={card.id}
                        />
                      );
                    })
                  : user.history.map((card) => {
                      return (
                        <Card
                          key={card.id}
                          title={card.title}
                          desc={card.description}
                          owner={card.ownerName}
                          tags={card.tags}
                          id={card.id}
                        />
                      );
                    })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Decks;
