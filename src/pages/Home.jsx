import React, { useEffect } from "react";
import "../css/Home.css";
import activeRecall from "../assets/077-student-colour.png";
import travel from "../assets/053-holding-phone-colour.png";
import free from "../assets/101-unlock.png";
import publicorown from "../assets/035-drawkit-developer-woman-colour.png";
import { useNavigate } from "react-router";
import { logData } from "../firebase/firebase";

const Home = () => {
  const navigate = useNavigate();

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    document.title = "Flashcards | Home";

    logData("home_page");
  }, []);

  return (
    <>
      <div className="page page-1 home-page-1">
        <div className="text-container">
          <h1 className="title">Make flashcards and study for free.</h1>
          <div className="button-row">
            <button className="button" onClick={() => goToLink("/signup")}>
              Sign up
            </button>
            <button className="button" onClick={() => goToLink("/login")}>
              Log in
            </button>
          </div>
        </div>
      </div>
      <div className="page page-2 home-page-2">
        <div className="row row-1">
          <div className="text">
            <h3 className="header">
              Completely free. No subscriptions or ads.
            </h3>
            <p className="content">
              We offer a completely free flashcard and study app with no ads or
              hidden fees.
            </p>
          </div>
          <div className="image">
            <img src={free} alt="Completely free" />
          </div>
        </div>
        <div className="row row-2">
          <div className="text">
            <h3 className="header">The power of active recall</h3>
            <p className="content">
              Our learning tool uses active recall to help you improve your weak
              areas and stay proficient with all your studies.
            </p>
          </div>
          <div className="image">
            <img src={activeRecall} alt="Active recall" />
          </div>
        </div>
        <div className="row row-3">
          <div className="text">
            <h3 className="header">Make decks or find more</h3>
            <p className="content">
              You can either make your own decks or find public decks that other
              people make.
            </p>
          </div>
          <div className="image">
            <img src={publicorown} alt="Make decks or find more" />
          </div>
        </div>
        <div className="row row-4">
          <div className="text">
            <h3 className="header">
              <span className="coming-soon">Coming soon</span>
              Study on the go
            </h3>
            <p className="content">
              Download the app on your phone and study while going to school.
            </p>
          </div>
          <div className="image">
            <img src={travel} alt="Study on the go" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
