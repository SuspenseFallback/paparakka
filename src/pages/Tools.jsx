import React from "react";
import "../css/Tools.css";
import { useNavigate } from "react-router";

const Tools = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page page-1 tools-page-1">
        <h1 className="header">Tools</h1>
        <div className="container">
          <div className="tool-card">
            <p className="title" onClick={() => navigate("/tools/add-binary")}>
              Adding 8-bit binary
            </p>
            <p className="desc">Topic: Computer science</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
