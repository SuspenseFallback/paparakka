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
