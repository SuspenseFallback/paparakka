import React, { useState } from "react";

const Rating = () => {
  const [isRating, setIsRating] = useState(false);

  //   stars
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const [rated, setRated] = useState(false);

  return (
    <div
      className={"rating " + (isRating ? "rate" : "")}
      onClick={() => setIsRating(!isRating)}
    >
      <div className="icons">
        {isRating ? (
          <>
            <i
              className={
                "icon pi rate-star " + (star1 ? "pi-star-fill" : "pi-star")
              }
              onMouseOver={() => {
                if (!rated) {
                  setStar1(true);
                }
              }}
              onMouseOut={() => {
                if (!rated) {
                  setStar1(false);
                }
              }}
              onClick={() => {
                setRated(true);
              }}
            ></i>
            <i
              className={
                "icon pi rate-star " + (star2 ? "pi-star-fill" : "pi-star")
              }
              onMouseOver={() => {
                if (!rated) {
                  setStar1(true);
                  setStar2(true);
                }
              }}
              onMouseOut={() => {
                if (!rated) {
                  setStar1(false);
                  setStar2(false);
                }
              }}
              onClick={() => {
                setRated(true);
              }}
            ></i>
            <i
              className={
                "icon pi rate-star " + (star3 ? "pi-star-fill" : "pi-star")
              }
              onMouseOver={() => {
                if (!rated) {
                  setStar1(true);
                  setStar2(true);
                  setStar3(true);
                }
              }}
              onMouseOut={() => {
                if (!rated) {
                  setStar1(false);
                  setStar2(false);
                  setStar3(false);
                }
              }}
              onClick={() => {
                setRated(true);
              }}
            ></i>
            <i
              className={
                "icon pi rate-star " + (star4 ? "pi-star-fill" : "pi-star")
              }
              onMouseOver={() => {
                if (!rated) {
                  setStar1(true);
                  setStar2(true);
                  setStar3(true);
                  setStar4(true);
                }
              }}
              onMouseOut={() => {
                if (!rated) {
                  setStar1(false);
                  setStar2(false);
                  setStar3(false);
                  setStar4(false);
                }
              }}
              onClick={() => {
                setRated(true);
              }}
            ></i>
          </>
        ) : null}
        <i
          className={
            "icon pi rate-star " +
            (isRating ? (star5 ? "pi-star-fill" : "pi-star") : "pi-star-fill")
          }
          onMouseOver={() => {
            if (!rated) {
              setStar1(true);
              setStar2(true);
              setStar3(true);
              setStar4(true);
              setStar5(true);
            }
          }}
          onMouseOut={() => {
            if (!rated) {
              setStar1(false);
              setStar2(false);
              setStar3(false);
              setStar4(false);
              setStar5(false);
            }
          }}
          onClick={() => {
            if (isRating) {
              setRated(true);
            }
          }}
        ></i>
      </div>

      <div className="rating-column">
        <p className="rating-figure">4.2</p>
        <p className="number-of-ratings">2 ratings</p>
      </div>
    </div>
  );
};

export default Rating;
