import React, { useState, useEffect } from "react";
import { getOwnerSets } from "../firebase/firebase";
import Card from "../components/Card/Card";

import "../css/MySets.css";

const MySets = ({ user }) => {
  const [loading, set_loading] = useState(true);
  const [my_decks, set_my_decks] = useState([]);
  const [total_decks, set_total_decks] = useState([]);

  useEffect(() => {
    document.title = "Flashcards | My Decks";
  }, []);

  useEffect(() => {
    getOwnerSets(user.id, (data) => {
      set_total_decks(data);
      if (data.length < 9) {
        set_my_decks(data);
      } else {
        set_my_decks(data.slice(0, 9));
      }
      set_loading(false);
    });
  }, []);
  return (
    <>
      <main className="my-sets-page">
        <div className="page page-1 my-sets-page-1">
          <div className="my-sets">
            <p className="title">My sets </p>
            <div className="decks">
              {my_decks.map((deck, index) => {
                return (
                  <Card
                    key={index + 9000}
                    title={deck.title}
                    desc={deck.description}
                    tags={deck.tags}
                    owner={deck.ownerName}
                    id={deck.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MySets;
