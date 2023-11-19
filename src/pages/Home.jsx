import React, { useEffect, useLayoutEffect, useRef } from "react";

import { useNavigate } from "react-router";
import { logData } from "../firebase/firebase";

import "../css/Home.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

import flashcards from "../assets/flashcards.png";
import learn from "../assets/learn.png";
import dictate from "../assets/dictate.png";
import HomeAnim from "../components/Home/HomeAnim";

const Home = () => {
  const navigate = useNavigate();

  const ref = useRef(null);

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    document.title = "Flashcards | Home";

    logData("home_page");
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(element.querySelector(".home-page-1 .part-1 .animation"), {
        y: 240,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: element.querySelector(".home-page-1 .part-1"),
          start: "top -30%",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      gsap.to(element.querySelector(".home-page-1 .part-1 .animation"), {
        scale: 1.1,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: element.querySelector(".home-page-1 .part-1"),
          start: "top -30%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        element.querySelector(".home-page-1 .part-2 .text-container"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          delay: 0.5,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-1 .part-1"),
            start: "top -30%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.querySelector(".home-page-4 .header"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-4"),
            start: "top 50%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.querySelector(".home-page-3 .header"),
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-3"),
            start: "top 80%",
            end: "top -10%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        element.querySelectorAll(".home-page-3 .container .type-card"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-3"),
            start: "top 20%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="home-page" ref={ref}>
        <div className="page page-1 home-page-1">
          <div className="part-1">
            <div className="container">
              <div className="text-container">
                <h1 className="title">Make flashcards and study for free.</h1>
                <div className="button-row">
                  <button
                    className="button"
                    onClick={() => goToLink("/signup")}
                  >
                    Sign up
                  </button>
                  <button className="button" onClick={() => goToLink("/login")}>
                    Log in
                  </button>
                </div>
              </div>
              <HomeAnim home_ref={ref} className=".home-page-1 " />
            </div>
          </div>
          <div className="part-2">
            <div className="text-container">
              <p className="header">
                The <span>best flashcards</span> out there
              </p>
              <button className="button">Check it out</button>
            </div>
          </div>
        </div>
        <div className="page page-2 home-page-2">
          <p className="header">Why us?</p>
          <div className="reason reason-1">
            <p className="title">Active Recall</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              repellat laboriosam, fuga adipisci nostrum corporis voluptatem
              nihil corrupti sequi, consectetur labore rerum dicta totam
              doloremque quia vitae, placeat enim. Enim.
            </p>
          </div>
          <div className="reason reason-2">
            <p className="title">Easy to use</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              repellat laboriosam, fuga adipisci nostrum corporis voluptatem
              nihil corrupti sequi, consectetur labore rerum dicta totam
              doloremque quia vitae, placeat enim. Enim.
            </p>
          </div>
          <div className="reason reason-3">
            <p className="title">Completely free</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              repellat laboriosam, fuga adipisci nostrum corporis voluptatem
              nihil corrupti sequi, consectetur labore rerum dicta totam
              doloremque quia vitae, placeat enim. Enim.
            </p>
          </div>
          <div className="reason reason-4">
            <p className="title">Multiple methods to learn and revise</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              repellat laboriosam, fuga adipisci nostrum corporis voluptatem
              nihil corrupti sequi, consectetur labore rerum dicta totam
              doloremque quia vitae, placeat enim. Enim.
            </p>
          </div>
        </div>
        <div className="page page-3 home-page-3">
          <h1 className="header">So many different learning methods</h1>
          <div className="container">
            <div className="type-card">
              <img src={flashcards} alt="Flashcards" className="img" />
              <p className="title">Flashcards</p>
              <p className="desc">
                Flashcards shows multiple cards which have a front and a back -
                a question and an answer. These can be used to get a superficial
                understanding of the answers, but are superior to other methods
                due to active recall.
              </p>
              <div className="button">Try it out</div>
            </div>
            <div className="type-card">
              <img src={learn} alt="Learn" className="img" />
              <p className="title">Learn</p>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit voluptate amet corrupti nemo similique iure tempore.
                Magnam expedita, doloremque et sed sunt vel iste saepe, fugit
                quos optio laborum vitae.
              </p>
              <div className="button">Try it out</div>
            </div>
            <div className="type-card">
              <img src={dictate} alt="Dictate" className="img" />
              <p className="title">Dictate</p>
              <p className="desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda itaque aliquam quae dolore iste quasi iusto aut
                voluptates quis totam inventore, maxime adipisci aperiam
                praesentium nemo. Repellat dolore quisquam quasi.
              </p>
              <div className="button">Try it out</div>
            </div>
          </div>
        </div>
        <div className="page page-4 home-page-4">
          <h1 className="header">Sign up to gain access to all features</h1>
          <div className="button-row">
            <div className="button">Sign up</div>
            <div className="button">Log in</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
