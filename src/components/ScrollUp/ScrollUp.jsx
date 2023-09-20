import React, { useEffect, useState } from "react";
import "./ScrollUp.css";

const ScrollUp = ({ limit }) => {
  const [scrolled, set_scrolled] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > limit) {
        set_scrolled(true);
      } else {
        set_scrolled(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div
      className={"scroll-button " + (scrolled ? "show" : "")}
      onClick={scrollUp}
    >
      <span className="icon pi pi-arrow-up"></span>
    </div>
  );
};

export default ScrollUp;
