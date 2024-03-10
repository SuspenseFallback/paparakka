import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router";
import { getAllSets, logData } from "../firebase/firebase";

import "../css/Home.css";

import gsap from "gsap";
import HomeAnim from "../components/Home/HomeAnim";
import Accordion from "../components/Accordion/Accordion";

import { Button } from "../components/ui/moving-border.tsx";
import Flashcard from "../components/Flashcards/Flashcard.jsx";

const Home = () => {
  const navigate = useNavigate();
  const flashcard_ref = useRef();

  const [card_index, set_card_index] = useState(1);
  const [illustration_card, set_illustration_card] = useState(false);
  const [number_of_sets, set_number_of_sets] = useState(0);
  const [users, set_users] = useState(0);

  const ref = useRef(null);

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    document.title = "Papparakka | Home";

    logData("home_page");
  }, []);

  useEffect(() => {
    card_move();
  }, [card_index]);

  useEffect(() => {
    setInterval(() => {
      set_illustration_card(!illustration_card);
    }, 4000);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      card_move();
    });
  }, []);

  useEffect(() => {
    getAllSets((sets) => {
      set_number_of_sets(sets.length);
    });
  }, []);

  const card_move = () => {
    const slide = document.querySelector(".home-page-3 .container");
    const x =
      card_index == 1
        ? 0
        : card_index == 2
        ? window.innerWidth * 0.387 * -1
        : card_index == 3
        ? window.innerWidth * 0.387 * -2
        : 0;

    const card1 = document.querySelector(
      ".home-page-3 .container .type-card-1"
    );
    const card2 = document.querySelector(
      ".home-page-3 .container .type-card-2"
    );
    const card3 = document.querySelector(
      ".home-page-3 .container .type-card-3"
    );

    if (card_index == 1) {
      card1.classList.remove("inactive");
      card2.classList.add("inactive");
      card3.classList.add("inactive");
    } else if (card_index == 2) {
      card1.classList.add("inactive");
      card2.classList.remove("inactive");
      card3.classList.add("inactive");
    } else if (card_index == 3) {
      card1.classList.add("inactive");
      card2.classList.add("inactive");
      card3.classList.remove("inactive");
    }

    const ctx = gsap.context(() => {
      gsap.to(slide, {
        duration: 0.5,
        ease: "",
        x: x,
      });
    }, ref);

    return () => ctx.revert();
  };

  return (
    <>
      <main className="home-page" ref={ref}>
        <div className="page page-1 home-page-1">
          <div className="text-container">
            <h1 className="title">Make flashcards and study for free.</h1>
            <div className="button-row">
              <Button onClick={() => goToLink("/signup")}>Sign up</Button>
              <Button onClick={() => goToLink("/login")}>Log in</Button>
            </div>
          </div>
          <div className="illustrations">
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
                <p className="stat">{number_of_sets}</p>
                <p className="desc">sets created</p>
              </div>
            </div>
          </div>
        </div>
        <div className="page page-2 home-page-2"></div>
        <div className="page page-3 home-page-3">
          <h1 className="header">So many different learning methods</h1>
          <div className="slide-container">
            <div className="container">
              <div className="type-card type-card-1">
                <p className="title">Flashcards</p>
                <p className="desc">
                  Flashcards shows multiple cards which have a front and a back
                  - a question and an answer. These can be used to get a
                  superficial understanding of the answers, but are superior to
                  other methods due to active recall.
                </p>
              </div>
              <div className="type-card type-card-2 inactive">
                <p className="title">Learn</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit voluptate amet corrupti nemo similique iure tempore.
                  Magnam expedita, doloremque et sed sunt vel iste saepe, fugit
                  quos optio laborum vitae.
                </p>
              </div>
              <div className="type-card type-card-3 inactive">
                <p className="title">Dictate</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda itaque aliquam quae dolore iste quasi iusto aut
                  voluptates quis totam inventore, maxime adipisci aperiam
                  praesentium nemo. Repellat dolore quisquam quasi.
                </p>
              </div>
            </div>
            <div className="controls">
              <button
                className="control"
                disabled={card_index == 1}
                onClick={() => {
                  set_card_index(card_index - 1);
                }}
              >
                <span className="pi pi-angle-left"></span>
              </button>
              <button
                className="control"
                disabled={card_index == 3}
                onClick={() => {
                  set_card_index(card_index + 1);
                }}
              >
                <span className="pi pi-angle-right"></span>
              </button>
            </div>
            <div className="pagination">
              <span
                className={"dot" + (card_index == 1 ? " active" : "")}
              ></span>
              <span
                className={"dot" + (card_index == 2 ? " active" : "")}
              ></span>
              <span
                className={"dot" + (card_index == 3 ? " active" : "")}
              ></span>
            </div>
          </div>
        </div>
        <div className="page page-4 home-page-4">
          <p>
            <h1 className="header">FAQ</h1>
            <span className="cursor"></span>
          </p>
          <div className="content">
            <Accordion
              title="Example 1"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi id neque a dolorem sunt voluptate minima culpa eos odit expedita numquam optio, harum eaque tempore? Necessitatibus blanditiis hic voluptatum dicta."
            />
            <Accordion
              title="Example 2"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi id neque a dolorem sunt voluptate minima culpa eos odit expedita numquam optio, harum eaque tempore? Necessitatibus blanditiis hic voluptatum dicta."
            />
            <Accordion
              title="Example 3"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi id neque a dolorem sunt voluptate minima culpa eos odit expedita numquam optio, harum eaque tempore? Necessitatibus blanditiis hic voluptatum dicta."
            />
            <Accordion
              title="Example 4"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi id neque a dolorem sunt voluptate minima culpa eos odit expedita numquam optio, harum eaque tempore? Necessitatibus blanditiis hic voluptatum dicta."
            />
          </div>
        </div>
        <div className="page page-5 home-page-5">
          <p className="header">Contact us</p>
          <div className="content">
            <div className="input-1">
              <div className="input-container">
                <p className="label">Name</p>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your name here.."
                />
              </div>
              <div className="input-container">
                <p className="label">Email</p>
                <input
                  type="email"
                  className="input"
                  placeholder="example@example.com"
                />
              </div>
            </div>
            <div className="input-2">
              <div className="input-container">
                <p className="label">Subject</p>
                <textarea
                  className="textarea"
                  placeholder="Enter subject here"
                  maxLength={200}
                />
              </div>
            </div>
            <div className="input-3">
              <div className="input-container">
                <p className="label">Body</p>
                <textarea
                  className="textarea"
                  placeholder="Enter everything you want to say here.."
                  maxLength={500}
                />
              </div>
            </div>
          </div>
          <button className="submit">Submit</button>
        </div>
      </main>
    </>
  );
};

export default Home;
