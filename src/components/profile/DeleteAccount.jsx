import { useNavigate } from "react-router-dom";
import { auth, store } from "../../firebase";
import { useState } from "react";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
} from "firebase/firestore";
import Cookies from "universal-cookie";
import { deleteUser } from "firebase/auth";
import classes from "./DeleteAccount.module.css";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const user = auth.currentUser;
  const cookies = new Cookies();

  async function deleteAccount() {
    let id = "";
    await getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user.email))
    ).then((data) => {
      const result = data.docs.map((docc) => ({
        ...docc.data(),
        id: docc.id,
      }));
      console.log(result[0].id);
      id = result[0].id;
    });
    deleteDoc(doc(store, "usersdetails", id));
    deleteUser(user)
      .then(() => {
        setAlert("User successfully deleted");
        cookies.remove("firstname");
        cookies.remove("lastname");
        cookies.remove("email");
        cookies.remove("providerId");
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("account deleted");
  }

  function nav() {
    navigate("/");
  }
  return (
    <div>
      <h1 className={classes.title}>DeleteAccount</h1>
      <br />
      <div className={classes.card}>
        <h2>Are you sure you want to delete your account?</h2>
        <div className={classes.buttons}>
          <button onClick={deleteAccount}>Yes</button>
          <button onClick={nav}>No</button>
        </div>
      </div>
      {alert}
    </div>
  );
}
