import React, { useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router";
import { deleteSet } from "../../firebase/firebase";
import MiniModal from "../Modal/MiniModal.jsx";

const Card = ({ title, desc, tags, owner, id, user_id, owner_id }) => {
  const navigate = useNavigate();

  const [open, set_open] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const preview = () => {
    navigate("/learn/" + id);
  };

  const open_in_new_tab = () => {
    window.open("/learn/" + id, "_blank");
  };

  const edit = () => {
    window.open("/edit-set/" + id, "_blank");
  };

  const deletes = () => {
    deleteSet(id, user_id).then((res) => {
      if (res == "401") {
        console.error("Error");
      }

      setDeleteModal(false);
      window.location.reload();
    });
  };

  return (
    <>
      <MiniModal
        text="this set"
        open={deleteModal}
        setOpen={setDeleteModal}
        action={deletes}
      />
      <div className="card">
        <span
          className="more pi pi-ellipsis-h"
          onClick={() => set_open((o) => !o)}
        ></span>

        <div className="menu">
          <div
            className={"menu-item " + (open ? "" : "hiddens")}
            onClick={open_in_new_tab}
          >
            <span className="icon pi pi-external-link"></span>
          </div>
          {user_id == owner_id ? (
            <>
              <div
                className={"menu-item edit " + (open ? "" : "hiddens")}
                onClick={edit}
              >
                <span className="icon pi pi-pencil"></span>
              </div>
              <div
                className={"menu-item red delete " + (open ? "" : "hiddens")}
                onClick={() => setDeleteModal(true)}
              >
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
