import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate } from "react-router";
import { logData } from "../firebase/firebase";

import "../css/Home.css";

import gsap from "gsap";
import HomeAnim from "../components/Home/HomeAnim";
import Accordion from "../components/Accordion/Accordion";

const Home = () => {
  const navigate = useNavigate();

  const [card_index, set_card_index] = useState(1);

  const ref = useRef(null);

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    document.title = "Flashcards | Home";

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
            scrub: 2,
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
        element.querySelector(".home-page-2 .header"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2"),
            start: "top 50%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        gsap.utils.toArray(element.querySelectorAll(".home-page-2 .reason")),
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.4,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-2"),
            start: "top 30%",
            end: "bottom bottom",
            scrub: 3,
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
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-3"),
            start: "top 50%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        gsap.utils.toArray(element.querySelectorAll(".home-page-3 .type-card")),
        {
          x: -25,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.4,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-3"),
            start: "top 40%",
            end: "bottom bottom",
            scrub: 3,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        element.querySelector(".home-page-4 .header"),
        {
          text: { value: "" },
        },
        {
          text: { value: "FAQ" },
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-4"),
            start: "top 50%",
            end: "bottom bottom",
          },
        }
      );

      anim.eventCallback("onComplete", () => {
        setTimeout(() => {
          anim.reverse();
        }, 3000);
      });

      anim.eventCallback("onReverseComplete", () => {
        setTimeout(() => {
          anim.restart();
        }, 1000);
      });

      gsap.fromTo(
        gsap.utils.toArray(element.querySelectorAll(".home-page-4 .accordion")),
        {
          y: -25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.29,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-4"),
            start: "top 30%",
            end: "bottom bottom",
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
        element.querySelector(".home-page-5 .header"),
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-5"),
            start: "top 60%",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-5 .input-1"),
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-5"),
            start: "top 30%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-5 .input-3"),
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-5"),
            start: "top 20%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-5 .input-2"),
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-5"),
            start: "top 10%",
            end: "bottom bottom",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        element.querySelector(".home-page-5 .submit"),
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element.querySelector(".home-page-5"),
            start: "top -10%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
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
          <div className="slide">
            <div className="reason reason-1">
              <div className="text-container">
                <p className="title">Active Recall</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti repellat laboriosam, fuga adipisci nostrum corporis
                  voluptatem nihil corrupti sequi, consectetur labore rerum
                  dicta totam doloremque quia vitae, placeat enim. Enim.
                </p>
              </div>
            </div>
            <div className="reason reason-2">
              <div className="text-container">
                <p className="title">Easy to use</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti repellat laboriosam, fuga adipisci nostrum corporis
                  voluptatem nihil corrupti sequi, consectetur labore rerum
                  dicta totam doloremque quia vitae, placeat enim. Enim.
                </p>
              </div>
            </div>
            <div className="reason reason-3">
              <div className="text-container">
                <p className="title">Completely free</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti repellat laboriosam, fuga adipisci nostrum corporis
                  voluptatem nihil corrupti sequi, consectetur labore rerum
                  dicta totam doloremque quia vitae, placeat enim. Enim.
                </p>
              </div>
            </div>
            <div className="reason reason-4">
              <div className="text-container">
                <p className="title">Multiple methods to learn and revise</p>
                <p className="desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti repellat laboriosam, fuga adipisci nostrum corporis
                  voluptatem nihil corrupti sequi, consectetur labore rerum
                  dicta totam doloremque quia vitae, placeat enim. Enim.
                </p>
              </div>
            </div>
          </div>
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
