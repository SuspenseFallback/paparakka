import React, { useEffect, useState } from "react";
import "../css/EditSet.css";
import NewCard from "../components/Card/NewCard";
import Tag from "../components/Tags/Tag.jsx";
import { updateSet, getSet } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router";

const EditSet = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cards, set_cards] = useState([]);
  const [set, set_set] = useState({});
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [tags, set_tags] = useState([]);
  const [tag_value, set_tag_value] = useState("");
  const [loading, set_loading] = useState(true);

  const add_new_card = () => {
    set_cards((c) => [
      ...c,
      {
        term: "",
        definition: "",
        index: cards.length,
      },
    ]);
  };

  useEffect(() => {
    window.onbeforeunload = () => true;
  }, []);

  useEffect(() => {
    getSet(id).then((set) => {
      if (set.owner !== user.id) {
        window.close();
      }
      document.title = "Papparakka | Edit Set | " + set.title;

      set_set({ ...set });
      set_title(set.title);
      set_description(set.description);
      set_tags([...set.tags]);
      set_cards([...set.flashcards]);
      set_loading(false);
    });
  }, []);

  const submitHandler = () => {
    updateSet(
      {
        title: title,
        description: description,
        flashcards: cards,
        tags: tags,
        owner: user.id,
        ownerName: user.username,
      },
      set.id,
      user
    ).then((data) => {
      console.log(data);
      navigate("/learn/" + set.id);
    });
  };

  const onTag = (e) => {
    if (e.key === "Enter" || e.code === "Space") {
      if (e.target.value.trim() && tags.length < 5) {
        set_tags((t) => [...t, e.target.value]);
        set_tag_value("");
      }
    }
  };

  return (
    <>
      <div className={"edit-set-page-1 " + (loading ? " loading" : "")}>
        {loading ? (
          <>
            <span className="icon pi pi-spinner pi-spin"></span>
          </>
        ) : (
          <>
            <h1 className="header">Edit {set.title}</h1>
            <div className="row">
              <div className="input-container">
                <p className="label">
                  Title <span className="max">(max. 100 characters)</span>
                </p>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter title here..."
                  value={title}
                  onChange={(e) => set_title(e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="input-container">
                <p className="label">
                  Description <span className="max">(max. 100 characters)</span>
                </p>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter description here..."
                  value={description}
                  maxLength={100}
                  onChange={(e) =>
                    tags.length === 5 ? null : set_description(e.target.value)
                  }
                />
              </div>
              <div className="input-container">
                <p className="label">
                  Tags <span className="max">(max. 5 tags)</span>
                  {tags.map((tag, index) => {
                    const removeTag = () => {
                      const tags_copy = [...tags];

                      tags_copy.splice(index, 1);

                      set_tags(tags_copy);
                    };

                    return (
                      <Tag
                        key={index + 1245}
                        text={tag}
                        removeTag={removeTag}
                      />
                    );
                  })}
                </p>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter tags here..."
                  value={tag_value}
                  onChange={(e) => set_tag_value(e.target.value)}
                  onKeyDown={(e) => onTag(e)}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="cards">
              {cards.map((card, index) => {
                const cardNumber = index + 1;

                const updateCard = (data) => {
                  let new_cards = [...cards];

                  new_cards[index].term = data.term;
                  new_cards[index].definition = data.definition;

                  set_cards(new_cards);
                };

                const duplicate = () => {
                  let new_cards = [...cards];
                  const term = cards[index].term;
                  const definition = cards[index].definition;

                  new_cards.splice(index, 0, {
                    term: term,
                    definition: definition,
                    index: index + 1,
                  });

                  set_cards(new_cards);
                };

                const deleteCard = () => {
                  let new_cards = [...cards];

                  new_cards.splice(index, 1);
                  new_cards.forEach((card, index) => {
                    card.index = index;
                  });

                  set_cards(new_cards);
                };

                return (
                  <NewCard
                    cardNumber={cardNumber}
                    key={cardNumber}
                    updateCard={updateCard}
                    duplicate={duplicate}
                    deleteCard={deleteCard}
                    cards={cards}
                  />
                );
              })}
              <button className="button button-glass" onClick={add_new_card}>
                Add flashcard <span className="icon pi pi-plus"></span>
              </button>
            </div>
            <button className="button-block" onClick={submitHandler}>
              Save deck
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default EditSet;
