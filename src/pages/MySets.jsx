import React, { useState, useEffect } from "react";
import { getOwnerSets } from "../firebase/firebase";
import Card from "../components/Card/Card";

import "../css/MySets.css";

const MySets = ({ user }) => {
  const [loading, set_loading] = useState(true);
  const [my_sets, set_my_sets] = useState([]);
  const [total_sets, set_total_sets] = useState([]);

  useEffect(() => {
    document.title = "Papparakka | My Decks";
  }, []);

  useEffect(() => {
    const fetchSets = async () => {
      const { sets, error } = await getOwnerSets(user.id);
      if (error) {
        console.error("Error fetching owner sets:", error);
        // Optionally, set an error state to display to the user
      } else {
        set_total_sets(sets);
        if (sets.length < 9) {
          set_my_sets(sets);
        } else {
          set_my_sets(sets.slice(0, 9));
        }
      }
      set_loading(false);
    };

    if (user && user.id) {
      fetchSets();
    }
  }, [user]);
  return (
    <>
      <main className="my-sets-page">
        <div className="page page-1 my-sets-page-1">
          <div className="my-sets">
            <p className="title">My sets </p>
            <div className="sets">
              {my_sets.map((set, index) => {
                return (
                  <Card
                    owner_id={set.owner}
                    key={index + 9000}
                    title={set.title}
                    desc={set.description}
                    tags={set.tags}
                    owner={set.ownerName}
                    id={set.id}
                    user_id={user.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MySets;
