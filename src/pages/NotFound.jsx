import React, { useEffect } from "react";
import "../css/NotFound.css";
import { useNavigate } from "react-router-dom";
import { logData } from "../firebase/firebase";

const NotFound = () => {
  const navigate = useNavigate();

  const goToLink = (link) => {
    navigate(link);
  };

  useEffect(() => {
    logData("not_found");

    document.title = "Papparakka | 404 - Not Found";
  }, []);

  return (
    <>
      <div className="page page-1 not-found-page-1">
        <div className="text-container">
          <h1 className="title">Where are we?</h1>
          <p className="subtitle">Let's go back home.</p>
          <button className="button" onClick={() => goToLink("/")}>
            Take me back
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
