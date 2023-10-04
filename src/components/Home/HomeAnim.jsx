import React, { useLayoutEffect } from "react";

import { gsap } from "gsap";

import "./HomeAnim.css";

const HomeAnim = ({ home_ref, className }) => {
  useLayoutEffect(() => {
    if (home_ref.current != null) {
      const element = home_ref.current;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          repeat: -1,
        });

        // make stuff show up

        tl.fromTo(
          element.querySelector(className + ".animation .anim-card"),
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
          element.querySelector(className + ".animation .anim-controls"),
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
          element.querySelector(className + ".animation .anim-card .text-1"),
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
          element.querySelector(className + ".animation .anim-card .text-2"),
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
            className + ".animation .anim-controls .anim-button:nth-child(3)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            rotateX: "180",
            duration: 0.5,
          },
          ">"
        );
        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(3)"
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
            className + ".animation .anim-controls .anim-button:nth-child(3)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            rotateX: "0",
            duration: 0.5,
          },
          ">"
        );
        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(3)"
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
            className + ".animation .anim-controls .anim-button:nth-child(2)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=1"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.5,
          },
          ">"
        );

        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(2)"
          ),
          {
            backgroundColor: "transparent",
            duration: 0.2,
          },
          ">-0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.001,
          },
          ">+=0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
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
            className + ".animation .anim-controls .anim-button:nth-child(4)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=1"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.5,
          },
          ">"
        );

        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(4)"
          ),
          {
            backgroundColor: "transparent",
            duration: 0.2,
          },
          ">-0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.001,
          },
          ">+=0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
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
            className + ".animation .anim-controls .anim-button:nth-child(1)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=1"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.5,
          },
          ">"
        );

        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(1)"
          ),
          {
            backgroundColor: "transparent",
            duration: 0.2,
          },
          ">-0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.001,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 1,
            x: 200,
            duration: 0.001,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.25,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.01,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 1,
            x: 200,
            duration: 0.001,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.25,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.01,
          },
          ">"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
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
            className + ".animation .anim-controls .anim-button:nth-child(5)"
          ),
          {
            backgroundColor: "var(--app-grey)",
            duration: 0.2,
          },
          ">+=1"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.5,
          },
          ">"
        );

        tl.to(
          element.querySelector(
            className + ".animation .anim-controls .anim-button:nth-child(5)"
          ),
          {
            backgroundColor: "transparent",
            duration: 0.2,
          },
          ">-0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.001,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 1,
            x: -200,
            duration: 0.001,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.25,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.01,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 1,
            x: -200,
            duration: 0.001,
          },
          ">+=0.5"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: 200,
            duration: 0.25,
          },
          ">"
        );
        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            x: -200,
            duration: 0.01,
          },
          ">"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 1,
            x: 0,
            duration: 0.25,
          },
          ">+=0.5"
        );

        // make everything go out

        tl.to(
          element.querySelector(className + ".animation .anim-card .text-2"),
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.75,
          },
          ">"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card .text-1"),
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.5,
          },
          ">-=0.5"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-controls"),
          {
            opacity: 0,
            y: 20,
            duration: 1,
          },
          ">-=0.75"
        );

        tl.to(
          element.querySelector(className + ".animation .anim-card"),
          {
            opacity: 0,
            y: 20,

            duration: 1,
          },
          "+=0.5"
        );
      }, home_ref);

      return () => ctx.revert();
    }
  }, []);
  return (
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
  );
};

export default HomeAnim;
