import React, { useEffect, useState, useRef } from "react";
import "../css/NewSet.css";
import NewCard from "../components/Card/NewCard";
import Tag from "../components/Tags/Tag.jsx";
import { getUser, addSet } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Modal from "../components/Modal/Modal.jsx";

const NewSet = () => {
  const navigate = useNavigate();

  const files = useRef();

  const [user, setUser] = useState(null);

  // anki modal
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  // deck values
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [tags, set_tags] = useState([]);
  const [tag_value, set_tag_value] = useState("");
  const [disabled, set_disabled] = useState(true);

  useEffect(() => {
    if (!title || !description) {
      set_disabled(true);
    } else {
      set_disabled(false);
    }
  }, [title, description]);

  useEffect(() => {
    getUser((data) => {
      setUser(data);
    });
  }, []);

  const submitHandler = () => {
    addSet(
      {
        title: title,
        description: description,
        flashcards: [],
        tags: tags,
        owner: user.id,
        ownerName: user.username,
      },
      (data) => {
        console.log(data);
        navigate("/dashboard");
      }
    );
  };

  const onTag = (e) => {
    if (e.key === "Enter" || e.code === "Space") {
      if (
        e.target.value.trim() &&
        (tags.length < 5) & (e.target.value.length <= 20)
      ) {
        set_tags((t) => [...t, e.target.value]);
        set_tag_value("");
      }
    }
  };

  const handleFile = () => {
    const input = files.current;
    const read = new FileReader();

    read.readAsBinaryString(input.files[0]);

    read.onloadend = function () {
      const lines = read.result.split("\n");

      console.log(lines);
      if (lines[0] != "#separator:tab") {
        return setError("Invalid file provided");
      }

      if (lines[1] != "#html:false") {
        return setError("Invalid file provided");
      }

      setError("");
      lines.splice(0, 2);

      lines.forEach((line) => {});
    };
  };

  return (
    <>
      <div className="new-set-page-1">
        <Modal open={open} set_open={setOpen} title="Importing cards from Anki">
          <ol>
            <li>Open the Anki app</li>
            <li>Hover over the deck you want to export</li>
            <li>Click on the settings icon</li>
            <li>Click 'Export'</li>
            <li>Select 'Cards in plain text (.txt)'</li>
            <li>Select separator as tab and set HTML media to false</li>
            <li>Choose the file here</li>
          </ol>
          <input
            type="file"
            name="fileHandler"
            id="text"
            accept="text/*,.txt"
            ref={files}
          />
          <p className="error">{error}</p>
          <button className="button button-block" onClick={handleFile}>
            Submit
          </button>
        </Modal>
        <h1 className="header">Create a new deck</h1>
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
              Tags <span className="max">(max. 5 tags)</span>{" "}
              <span className="max">(max. 20 char.)</span>
              {tags.map((tag, index) => {
                const removeTag = () => {
                  const tags_copy = [...tags];

                  tags_copy.splice(index, 1);

                  set_tags(tags_copy);
                };

                return (
                  <Tag key={index + 1245} text={tag} removeTag={removeTag} />
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
              maxLength={20}
            />
          </div>
        </div>
        <div className="row imports">
          <button className="button" onClick={() => setOpen(true)}>
            Import cards from Anki
          </button>
        </div>
        <button
          className="button-block"
          disabled={disabled}
          onClick={submitHandler}
        >
          Create a new deck
        </button>
      </div>
    </>
  );
};

export default NewSet;
