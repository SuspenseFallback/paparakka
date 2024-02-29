import React, { useEffect, useState } from "react";
import "../css/Sets.css";
import Searchbar from "../components/Searchbar/Searchbar";
import Card from "../components/Card/Card";
import { getUser, logData } from "../firebase/firebase";

const Sets = () => {
  const [search, set_search] = useState("");
  const [user, set_user] = useState("");
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    logData("sets");

    document.title = "Papparakka - Sets";
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
      <div className={"page page-1 sets-page-1" + (loading ? " loading" : "")}>
        {loading ? (
          <span className="pi pi-spinner pi-spin"></span>
        ) : (
          <>
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
            <div className="recent-sets">
              <h2 className="subheader">Recent Sets</h2>
              {user && user.studied_sets && user.studied_sets.length > 0 ? (
                <div className="cards">
                  {user.studied_sets.length > 3
                    ? user.studied_sets.slice(0, 3).map((card) => {
                        return (
                          <Card
                            key={card.id}
                            title={card.title}
                            desc={card.description}
                            owner={card.ownerName}
                            tags={card.tags}
                            owner_id={card.owner}
                            id={card.id}
                            user_id={user.id}
                          />
                        );
                      })
                    : user.studied_sets.map((card) => {
                        return (
                          <Card
                            key={card.id}
                            title={card.title}
                            desc={card.description}
                            owner={card.ownerName}
                            owner_id={card.owner}
                            tags={card.tags}
                            id={card.id}
                            user_id={user.id}
                          />
                        );
                      })}
                </div>
              ) : (
                <div className="center">
                  <p className="text">
                    {user
                      ? "You haven't accessed any sets yet."
                      : "You are not signed in."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sets;
