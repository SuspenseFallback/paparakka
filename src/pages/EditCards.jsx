import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getSet, updateSet, updateStudiedSets } from "../firebase/firebase";

import "../css/EditCards.css";
import EditDialog from "../components/EditDialog";
import { useNavigate } from "react-router";

const EditCards = ({ user }) => {
  const navigate = useNavigate();
  const [set, set_set] = useState({});
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSet(id).then((data) => {
      document.title = "Papparakka | Add cards to " + data.title;
      set_set({ ...data });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (set == {}) {
      return;
    } else {
      updateSet(set, set.id, user);
      updateStudiedSets(user, set.id, set.flashcards);
    }
  }, [set]);

  useEffect(() => {
    window.onbeforeunload = () => true;
  }, []);

  return (
    <>
      <div className="edit-cards-page-1" data-color-mode="light">
        {loading ? (
          <i className="pi pi-spin pi-spinner"></i>
        ) : (
          <>
            <button className="button" onClick={() => navigate("/learn/" + id)}>
              Go back
            </button>
            <div className="cards">
              {set.flashcards.map((card, index) => {
                return <EditDialog card={card} set_set={set_set} set={set} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditCards;
