import React, { useState, useEffect } from "react";
import "../css/Stats.css";

const Stats = ({ user }) => {
  const [sets_studied_this_week, set_sets_studied_this_week] = useState(0);
  const [sets_studied_this_month, set_sets_studied_this_month] = useState(0);

  useEffect(() => {
    document.title = "Flashcards - Stats";
  }, []);

  useEffect(() => {
    let week_count = 0;
    let month_count = 0;

    if (user.studied_sets) {
      user.studied_sets.forEach((set) => {
        const date = new Date(set.time);
        const now = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );

        const diff = (now - date) / (1000 * 60 * 60 * 24);

        if (diff <= 7) {
          week_count += 1;
        }

        if (diff <= 30) {
          month_count += 1;
        }
      });
    }

    set_sets_studied_this_week(week_count);
    set_sets_studied_this_month(month_count);
  }, []);

  return (
    <>
      <div className="stats-page">
        <h1 className="header">Stats</h1>
        <div className="layout">
          <div className="set-column column">
            <p className="title">Set stats</p>
            <div className="stat">
              <p className="number">{sets_studied_this_week}</p>
              <p className="caption">sets studied in last 7 days</p>
            </div>
            <div className="stat">
              <p className="number">{sets_studied_this_month}</p>
              <p className="caption">sets studied in last 30 days</p>
            </div>
            <div className="stat">
              <p className="number">{user.studied_sets.length}</p>
              <p className="caption">sets studied in lifetime</p>
            </div>
          </div>
          <div className="misc-column column">
            <p className="title">Misc stats</p>
            <div className="stat">
              <p className="number">0</p>
              <p className="caption">sets studied in last 7 days</p>
            </div>
            <div className="stat">
              <p className="number">0</p>
              <p className="caption">sets studied in last 30 days</p>
            </div>
            <div className="stat">
              <p className="number">0</p>
              <p className="caption">sets studied in lifetime</p>
            </div>
          </div>
          <div className="wide-column column">
            <p className="title">{user.username}'s stats</p>
            <div className="wide-stat">
              <p className="number">0</p>
              <p className="caption">sets created by {user.username}</p>
            </div>
            <div className="wide-stat">
              <p className="number">0</p>
              <p className="caption">days of current streak</p>
            </div>
            <div className="wide-stat">
              <p className="number">0</p>
              <p className="caption">days in longest streak</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
