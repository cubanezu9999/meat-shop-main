/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { storage, store, auth } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import classes from "./AddPost.module.css";

function AddPost(props) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [picture, setPicture] = useState(null);

  async function addShowcase(e) {
    e.preventDefault();
    if (picture == null) return;
    let file = picture;
    let fileRef = ref(storage, `userImages/${file.name}`);

    uploadFiles(fileRef, file);
  }

  const uploadFiles = (fileRef, file) => {
    uploadBytesResumable(fileRef, file).then(() => {
      getDownloadURL(fileRef).then((val) => {
        console.log(val);
        const user = auth.currentUser;
        addDoc(collection(store, "usersshowcase"), {
          email: user.email,
          name: user.displayName,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          imageURL: val,
        });
        window.location.reload();
      });
    });
  };

  return (
    <div className={classes.container}>
      <br />

      <form className={classes.form} onSubmit={addShowcase}>
        <h2>Add new Post</h2>
        <div>
          <label htmlFor="title">Title: </label>
          <br />
          <input type="text" name="title" ref={titleRef} required />
        </div>
        <br />
        <div>
          <label htmlFor="description">Description: </label>
          <br />
          <textarea
            name="description"
            rows="4"
            cols="60"
            className={classes.textarea}
            ref={descriptionRef}
            required></textarea>
        </div>
        <br />
        <div className={classes.fileinput}>
          <label htmlFor="picture">Photo:</label>
          <br />
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">Submit</button>

          <button onClick={props.hideAddForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export { AddPost };
