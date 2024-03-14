import React, { useState, useEffect } from "react";
import "../../css/AddBinary.css";

const AddBinary = () => {
  const [binary1, setBinary1] = useState([]);
  const [binary2, setBinary2] = useState("");

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
  }, []);

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
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
          </div>
          <div className="answer-row">
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
            <input type="text" maxLength={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBinary;
