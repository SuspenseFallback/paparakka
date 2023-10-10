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
      const photos = gsap.utils.toArray(".box > div:not(:first-child)");
      const details = gsap.utils.toArray(".home-page-2 .left .reason");

      gsap.set(photos, {
        yPercent: 101,
      });

      ScrollTrigger.create({
        trigger: element.querySelector(".home-page-2"),
        pin: element.querySelector(".home-page-2 .right"),
        start: "top top",
        end: "bottom bottom",
      });

      details.forEach((detail, index) => {
        const headline = detail.querySelector("h1");
        ScrollTrigger.create({
          trigger: headline,
          start: "top 5%",
          end: "bottom -30%",
          animation: gsap.to(photos[index], { yPercent: 0 }),
          scrub: true,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: 0,
        scrollTrigger: {
          trigger: element.querySelector(".home-page-2 .box-4"),
        },
      });

      tl.fromTo(
        element.querySelector(".home-page-2 .right .box-4 .anim-card-1"),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element.querySelector(".home-page-2 .reason-1 .text"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2 .reason-1"),
            start: "top 40%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-2 .reason-2 .text"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2 .reason-2"),
            start: "top 40%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-2 .reason-3 .text"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2 .reason-3"),
            start: "top 40%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-2 .reason-4 .text"),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2 .reason-4"),
            start: "top 40%",
            end: "start -40%",
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
          <HomeAnim home_ref={ref} className=".home-page-1 " />
        </div>
        <div className="page page-2 home-page-2">
          <div className="left">
            <div className="reason reason-1">
              <div className="text">
                <h1 className="header">
                  <span>Easy</span> to use
                </h1>
                <p className="desc">
                  Our app is really easy to use! Just sign up, find a deck and
                  let the magic begin! We handle all the logic and creation of
                  flashcards so that you don't have to.
                </p>
              </div>
            </div>
            <div className="reason reason-2">
              <div className="text">
                <h1 className="header">
                  Completely <span>free</span>
                </h1>
                <p className="desc">
                  We made our app completely free to use so that students all
                  across the world have the best tools at their fingertips for
                  free. We don't have advertisements either!
                </p>
              </div>
            </div>
            <div className="reason reason-3">
              <div className="text">
                <h1 className="header">
                  The power of <span>active recall</span>
                </h1>
                <p className="desc">
                  When using flashcards, our brain does something called active
                  recall, where you must delve deep into your memory to find the
                  answers to questions. This promotes the strength of those
                  memories and helps you actively recall them later on.
                </p>
              </div>
            </div>
            <div className="reason reason-4">
              <div className="text">
                <h1 className="header">
                  Use other people's <span>flashcards</span>
                </h1>
                <p className="desc">
                  With our search system, you can find and use anyone's
                  flashcards! This means you don't always have to make your own.
                  It is also quite useful for teachers!
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="box">
              <div className="blue">
                <div className="animation">
                  <span className="icon pi pi-check-circle"></span>
                </div>
              </div>
              <div className="green">
                <div className="animation">
                  <span className="icon pi pi-money-bill"></span>
                  <span className="pi pi-ban"></span>
                </div>
              </div>
              <div className="red">
                <div className="animation">
                  <div className="cards">
                    <div className="anim-card anim-card-1"></div>
                    <div className="anim-card anim-card-2"></div>
                  </div>
                </div>
              </div>
              <div className="pink box-4">
                <div className="animation">
                  <div className="searchbar">
                    <span className="icon pi pi-search"></span>
                  </div>
                  <div className="anim-card anim-card-1"></div>
                  <div className="anim-card anim-card-2"></div>
                </div>
              </div>
            </div>
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
