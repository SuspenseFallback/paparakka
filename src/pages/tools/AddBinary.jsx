import React, { useState, useEffect } from "react";
import "../../css/AddBinary.css";

const AddBinary = () => {
  const [binary1, setBinary1] = useState([]);
  const [binary2, setBinary2] = useState([]);

  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const [digit5, setDigit5] = useState("");
  const [digit6, setDigit6] = useState("");
  const [digit7, setDigit7] = useState("");
  const [digit8, setDigit8] = useState("");
  const [digit9, setDigit9] = useState("");

  const [answer, setAnswer] = useState("");

  function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  useEffect(() => {
    const newBinary1 = [];
    for (var i = 0; i < 8; i++) {
      const number = Math.round(Math.random());
      newBinary1.push(number);
    }

    const newBinary2 = [];
    for (var i = 0; i < 8; i++) {
      const number = Math.round(Math.random());
      newBinary2.push(number);
    }

    setBinary1(newBinary1);
    setBinary2(newBinary2);

    let denary1 = 0;
    let denary2 = 0;

    newBinary1.forEach((bin, index) => {
      if (bin == 1) {
        denary1 += Math.pow(2, index);
      }
    });

    newBinary2.forEach((bin, index) => {
      if (bin == 1) {
        denary2 += Math.pow(2, index);
      }
    });

    setAnswer(pad(dec2bin(denary1 + denary2), 9));
  }, []);

  const check = () => {
    const userAns = [
      digit9.toString(),
      digit8.toString(),
      digit7.toString(),
      digit6.toString(),
      digit5.toString(),
      digit4.toString(),
      digit3.toString(),
      digit2.toString(),
      digit1.toString(),
    ];

    const string = userAns.join("");
  };

  return (
    <>
      <div className="add-binary-page-1 page page-1">
        <h1 className="header">Add binary</h1>
        <div className="container">
          <div className="binary-1">
            {binary1.map((digit) => (
              <p className="digit">{digit}</p>
            ))}
          </div>
          <div className="binary-2">
            <p className="digit plus">+</p>
            {binary2.map((digit) => (
              <p className="digit">{digit}</p>
            ))}
          </div>
          <div className="answer-row">
            <input
              type="text"
              maxLength={1}
              value={digit9}
              onChange={(e) => setDigit9(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit8}
              onChange={(e) => setDigit8(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit7}
              onChange={(e) => setDigit7(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit6}
              onChange={(e) => setDigit6(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit5}
              onChange={(e) => setDigit5(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit4}
              onChange={(e) => setDigit4(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit3}
              onChange={(e) => setDigit3(e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              value={digit2}
              onChange={(e) => setDigit2(e.target.value)}
            />

            <input
              type="text"
              maxLength={1}
              value={digit1}
              onChange={(e) => setDigit1(e.target.value)}
            />
          </div>
          <button className="button button-block" onClick={check}>
            Check
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBinary;
