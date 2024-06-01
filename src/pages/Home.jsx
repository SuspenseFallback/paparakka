import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router";
import { getAllSets, logData } from "../firebase/firebase";
import { motion } from "framer-motion";

import "../css/Home.css";

import gsap from "gsap";
import HomeAnim from "../components/Home/HomeAnim";
import Accordion from "../components/Accordion/Accordion";

import LandingPage from "../components/Home/LandingPage.jsx";
import Searchbar from "../components/Searchbar/Searchbar.jsx";

const Home = () => {
  const navigate = useNavigate();

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    document.title = "Papparakka | Home";

    logData("home_page");
  }, []);

  return (
    <>
      <main className="home-page">
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
          <div className="header-container">
            <h1 className="header">Use everyone's flashcards</h1>
          </div>
          <div className="text-container">
            <p className="desc">
              Rather than making your own flashcards for everything, why not use
              other's? Our website is made so that users can access any set of
              flashcards that anyone else has made, so that you can spend less
              boring time making flashcards and more useful time learning them.
            </p>
            <Searchbar placeholder="Search for sets..." />
            <button className="button button-block">Search</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
