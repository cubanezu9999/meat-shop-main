/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { DeleteModal } from "./DeleteModal";
import classes from "./PostItem.module.css";

function PostItem(props) {
  const [deleteButton, setDeleteButton] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user !== null) {
      setDeleteButton(true);
    }
  }, [user]);

  function showDeleteModal() {
    setDeleteModal(true);
  }

  function hideDeleteModal() {
    setDeleteModal(false);
  }

  return (
    <fieldset className={classes.container}>
      <legend className={classes.name}>{props.name}</legend>
      <div className={classes.text}>
        <div className={classes.title}>{props.title}</div>

        <div className={classes.description}>{props.description}</div>
      </div>
      <img src={props.imageURL} className={classes.image}></img>
      {deleteButton && <button onClick={showDeleteModal}>Delete Post</button>}
      {deleteModal && (
        <DeleteModal hideDeleteModal={hideDeleteModal} props={props} />
      )}
      <br />
    </fieldset>
  );
}

export { PostItem };
