import React, { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router";

const Card = ({ title, desc, tags, owner, id, user_id, owner_id }) => {
  const navigate = useNavigate();

  const [open, set_open] = useState(false);

  const preview = () => {
    navigate("/preview/" + id);
  };

  const open_in_new_tab = () => {
    window.open("/preview/" + id, "_blank");
  };

  const edit = () => {
    window.open("/edit-set/" + id, "_blank");
  };

  return (
    <>
      <div className="card">
        <span
          className="more pi pi-ellipsis-h"
          onClick={() => set_open((o) => !o)}
        ></span>

        <div className={"menu " + (open ? "" : "hidden")}>
          <div className="menu-item" onClick={open_in_new_tab}>
            <p className="text">Open in new tab</p>
            <span className="icon pi pi-external-link"></span>
          </div>
          {user_id == owner_id ? (
            <>
              <div className="menu-item" onClick={edit}>
                <p className="text">Edit</p>
                <span className="icon pi pi-pencil"></span>
              </div>
              <div className="menu-item red">
                <p className="text">Delete</p>
                <span className="icon pi pi-trash"></span>
              </div>
            </>
          ) : null}
        </div>
        <div className="top">
          <p className="title" onClick={preview}>
            {title}
          </p>
          <p className="desc">{desc}</p>
        </div>
        <div className="bottom">
          <p className="tags">
            {tags.map((tag) => (
              <span className="tag">{tag}</span>
            ))}
          </p>
          <p className="created-by">
            Created by <span>{owner}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
