import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router";
import { getAllSets, logData } from "../firebase/firebase";
import { motion } from "framer-motion";

import "../css/Home.css";

import gsap from "gsap";
import HomeAnim from "../components/Home/HomeAnim";
import Accordion from "../components/Accordion/Accordion";

import LandingPage from "../components/Home/LandingPage.jsx";

const Home = () => {
  const navigate = useNavigate();

  const [card_index, set_card_index] = useState(1);

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
    window.addEventListener("resize", () => {
      card_move();
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
        <LandingPage goToLink={goToLink} />
        <div className="page page-2 home-page-2">
          <motion.h1
            className="header"
            initial={{ opacity: 0, marginTop: "5vh" }}
            whileInView={{ opacity: 1, marginTop: "0" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            What are flashcards?
          </motion.h1>
          <motion.p
            className="description"
            initial={{ opacity: 0, marginTop: "15vh" }}
            whileInView={{ opacity: 1, marginTop: "10vh" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Flashcards are cards that contain bite-sized pieces of information
            in question-answer pairs, that help students learn more efficiently
            and much easier.
          </motion.p>
          <motion.div
            className="benefits"
            initial={{ opacity: 0, marginTop: "8vh" }}
            whileInView={{ opacity: 1, marginTop: "3vh" }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="benefit">
              <div className="icon-container">
                <i className="pi pi-lock"></i>
              </div>
              <p className="title">Active recall</p>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quisquam repudiandae blanditiis reiciendis dolore, neque tempora
                fugiat vel maiores sed recusandae quo corporis placeat sunt
                suscipit? Voluptas ducimus sunt possimus.
              </p>
            </div>
            <div className="benefit">
              <div className="icon-container">
                <i className="pi pi-th-large"></i>
              </div>
              <p className="title">Spaced repetition</p>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quisquam repudiandae blanditiis reiciendis dolore, neque tempora
                fugiat vel maiores sed recusandae quo corporis placeat sunt
                suscipit? Voluptas ducimus sunt possimus.
              </p>
            </div>
            <div className="benefit">
              <div className="icon-container">
                <i className="pi pi-box"></i>
              </div>
              <p className="title">Fun learning</p>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quisquam repudiandae blanditiis reiciendis dolore, neque tempora
                fugiat vel maiores sed recusandae quo corporis placeat sunt
                suscipit? Voluptas ducimus sunt possimus.
              </p>
            </div>
          </motion.div>
        </div>
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
