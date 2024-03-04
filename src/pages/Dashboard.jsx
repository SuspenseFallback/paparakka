import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import { getOwnerSets } from "../firebase/firebase";
import Card from "../components/Card/Card";
import { useNavigate } from "react-router";
import SpinnerAnim from "../components/SpinnerAnim/SpinnerAnim";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const [loading, set_loading] = useState(true);
  const [my_sets, set_my_sets] = useState([]);
  const [sets_studied_this_week, set_sets_studied_this_week] = useState(0);
  const [sets_studied_this_month, set_sets_studied_this_month] = useState(0);
  const [cards_studied, set_cards_studied] = useState(0);

  useEffect(() => {
    document.title = "Papparakka | Dashboard";
  }, []);

  useEffect(() => {
    getOwnerSets(user.id, (data) => {
      console.log(data);
      if (data.length < 6) {
        set_my_sets(data);
      } else {
        set_my_sets(data.slice(0, 6));
      }

      set_loading(false);
    });
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

    let sum = 0;

    if (user.studied_sets && user.studied_sets.length > 0) {
      user.studied_sets.forEach((set) => {
        set.flashcards.forEach((card) => {
          if (card.times_revised) {
            sum += card.times_revised;
          }
        });
      });
    }

    set_cards_studied(sum);
  }, []);

  const goToMyDecks = () => {
    navigate("/my-sets");
  };

  return (
    <main className="dashboard">
      <div
        className={"page page-1 dashboard-page-1 " + (loading ? "loading" : "")}
      >
        {loading ? (
          <SpinnerAnim />
        ) : (
          <>
            <div className="header">
              <div className="name">{user.username}'s stats</div>
              <div className="stats">
                <div className="week">
                  <span className="big">{sets_studied_this_week}</span>
                  <p className="desc">sets studied in the last 7 days</p>
                </div>
                <div className="month">
                  <span className="big">{sets_studied_this_month}</span>
                  <p className="desc">sets studied in the last 30 days</p>
                </div>
                <div className="year">
                  <span className="big">{cards_studied}</span>
                  <p className="desc">cards studied</p>
                </div>
              </div>
              <div className="month"></div>
              <div className="lifetime"></div>
            </div>
            <div className="my-sets">
              <p className="title">
                My sets{" "}
                <span className="more" onClick={goToMyDecks}>
                  <span className="icon pi pi-angle-right"></span>
                </span>
              </p>
              <div className={"sets " + (my_sets.length > 0 ? "" : "empty")}>
                {my_sets.length > 0 ? (
                  my_sets.map((set, index) => {
                    return (
                      <Card
                        key={index + 9000}
                        owner_id={set.owner}
                        title={set.title}
                        desc={set.description}
                        tags={set.tags}
                        owner={set.ownerName}
                        id={set.id}
                        user_id={user.id}
                      />
                    );
                  })
                ) : (
                  <p className="placeholder">You don't have any sets.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
