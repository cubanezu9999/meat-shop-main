import Navbar from "../Navbar/Navbar";
import classes from "./Showcase.module.css";
import { useEffect, useState } from "react";
import { store } from "../firebase.js";

import { collection, getDocs } from "firebase/firestore";
import { PostItem } from "../components/showcase/PostItem.jsx";
import { AddPost } from "../components/showcase/AddPost.jsx";

export default function Showcase() {
  const [posts, setPosts] = useState([]);
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    getDocs(collection(store, "usersshowcase")).then((data) => {
      const resultdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setPosts(resultdata);
    });
  }, []);

  function showAddForm() {
    setShowAddPost(true);
  }
  function hideAddForm() {
    setShowAddPost(false);
  }
  return (
    <div>
      <Navbar />
      <div className={classes.buttoncontainer}>
        <button onClick={showAddForm} className={classes.button}>
          Add Post
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            name={post.name}
            title={post.title}
            description={post.description}
            imageURL={post.imageURL}
          />
        ))}
      </div>
      {showAddPost && <AddPost hideAddForm={hideAddForm} />}
    </div>
  );
}
