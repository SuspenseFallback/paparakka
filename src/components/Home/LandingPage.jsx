import React, { useState, useEffect, useRef } from "react";

import { Button } from "../ui/moving-border.tsx";
import Flashcard from "../Flashcards/Flashcard.jsx";
import { getAllSets, getNumberOfUsers } from "../../firebase/firebase";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

const LandingPage = ({ goToLink }) => {
  const flashcard_ref = useRef();
  const [illustration_card, set_illustration_card] = useState(false);
  const [number_of_cards, set_number_of_cards] = useState(0);
  const [users, set_users] = useState(0);

  useEffect(() => {
    getAllSets((sets) => {
      let acc = 0;

      sets.forEach((s) => {
        acc += s.flashcards.length;
      });

      set_number_of_cards(acc);
    });

    getNumberOfUsers((number) => {
      set_users(number);
    });
  }, []);

  return (
    <div className="page page-1 home-page-1">
      <div className="text-container">
        <h1 className="title">Make flashcards and study for free.</h1>
        <div className="button-row">
          <Button onClick={() => goToLink("/signup")}>Sign up</Button>
          <Button onClick={() => goToLink("/login")}>Log in</Button>
        </div>
      </div>
      <div className="illustrations">
        <div className="tooltip">Click to flip</div>
        <Flashcard
          flashcard={flashcard_ref}
          term="What is a flashcard?"
          definition="Flashcard"
          flip={illustration_card}
          setFlip={set_illustration_card}
        />
        <div className="row">
          <div className="ill-card number-of-studied-card">
            <p className="stat">{users}</p>
            <p className="desc">users</p>
          </div>
          <div className="ill-card number-of-sets-card">
            <p className="stat">{number_of_cards}</p>
            <p className="desc">cards created</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
