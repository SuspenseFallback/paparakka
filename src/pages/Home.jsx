import React, { useEffect, useLayoutEffect, useRef } from "react";

import { useNavigate } from "react-router";
import { logData } from "../firebase/firebase";

import "../css/Home.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

import flashcards from "../assets/flashcards.png";
import learn from "../assets/learn.png";
import dictate from "../assets/dictate.png";

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
      const tl = gsap.timeline({
        repeat: -1,
      });

      // make stuff show up

      tl.fromTo(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "+=0.5"
      );

      tl.fromTo(
        element.querySelector(".home-page-1 .animation .anim-controls"),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        ">-=0.75"
      );

      tl.fromTo(
        element.querySelector(".home-page-1 .animation .anim-card .text-1"),
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.5,
        },
        ">-=0.5"
      );
      tl.fromTo(
        element.querySelector(".home-page-1 .animation .anim-card .text-2"),
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.75,
        },
        ">"
      );

      // click button and flip

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(3)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          rotateX: "180",
          duration: 0.5,
        },
        ">"
      );
      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(3)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-=0.5"
      );

      // click button and flip again

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(3)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          rotateX: "0",
          duration: 0.5,
        },
        ">"
      );
      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(3)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-=0.5"
      );

      // make card go left

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(2)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=1"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.5,
        },
        ">"
      );

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(2)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.001,
        },
        ">+=0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        },
        ">+=0.5"
      );

      // make card go right

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(4)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=1"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.5,
        },
        ">"
      );

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(4)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.001,
        },
        ">+=0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        },
        ">+=0.5"
      );

      // make card go all the way left

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(1)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=1"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.5,
        },
        ">"
      );

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(1)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.001,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 200,
          duration: 0.001,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.25,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.01,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 200,
          duration: 0.001,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.25,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.01,
        },
        ">"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
        },
        ">+=0.5"
      );

      // make card go all the way right

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(5)"
        ),
        {
          backgroundColor: "grey",
          duration: 0.2,
        },
        ">+=1"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.5,
        },
        ">"
      );

      tl.to(
        element.querySelector(
          ".home-page-1 .animation .anim-controls .anim-button:nth-child(5)"
        ),
        {
          backgroundColor: "transparent",
          duration: 0.2,
        },
        ">-0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.001,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: -200,
          duration: 0.001,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.25,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.01,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: -200,
          duration: 0.001,
        },
        ">+=0.5"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: 200,
          duration: 0.25,
        },
        ">"
      );
      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          x: -200,
          duration: 0.01,
        },
        ">"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
        },
        ">+=0.5"
      );

      // make everything go out

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card .text-2"),
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.75,
        },
        ">"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card .text-1"),
        {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.5,
        },
        ">-=0.5"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-controls"),
        {
          opacity: 0,
          y: 20,
          duration: 1,
        },
        ">-=0.75"
      );

      tl.to(
        element.querySelector(".home-page-1 .animation .anim-card"),
        {
          opacity: 0,
          y: 20,

          duration: 1,
        },
        "+=0.5"
      );
    }, ref);

    return () => ctx.revert();
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
          <div className="animation">
            <div className="anim-card">
              <div className="text-1"></div>
              <div className="text-2"></div>
            </div>
            <div className="anim-controls">
              <div className="anim-button">
                <span className="icon pi pi-angle-double-left"></span>
              </div>
              <div className="anim-button">
                <span className="icon pi pi-angle-left"></span>
              </div>
              <div className="anim-button">
                <span className="icon pi pi-arrow-up"></span>
              </div>
              <div className="anim-button">
                <span className="icon pi pi-angle-right"></span>
              </div>
              <div className="anim-button">
                <span className="icon pi pi-angle-double-right"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="page page-2 home-page-2">
          <div className="left">
            <div className="reason reason-1">
              <div className="text">
                <h1 className="header">
                  <span>Easy</span> to use
                </h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  eligendi quas architecto magni nostrum repellat at distinctio
                  dignissimos possimus debitis, amet, consectetur cumque
                  aspernatur eius aperiam hic vitae quibusdam fuga!
                </p>
              </div>
            </div>
            <div className="reason reason-2">
              <div className="text">
                <h1 className="header">
                  Completely <span>free</span>
                </h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  eligendi quas architecto magni nostrum repellat at distinctio
                  dignissimos possimus debitis, amet, consectetur cumque
                  aspernatur eius aperiam hic vitae quibusdam fuga!
                </p>
              </div>
            </div>
            <div className="reason reason-3">
              <div className="text">
                <h1 className="header">
                  The power of <span>active recall</span>
                </h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  eligendi quas architecto magni nostrum repellat at distinctio
                  dignissimos possimus debitis, amet, consectetur cumque
                  aspernatur eius aperiam hic vitae quibusdam fuga!
                </p>
              </div>
            </div>
            <div className="reason reason-4">
              <div className="text">
                <h1 className="header">
                  Use other people's <span>flashcards</span>
                </h1>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  eligendi quas architecto magni nostrum repellat at distinctio
                  dignissimos possimus debitis, amet, consectetur cumque
                  aspernatur eius aperiam hic vitae quibusdam fuga!
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
