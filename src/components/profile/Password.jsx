import { auth } from "../../firebase";

import { useState, useEffect } from "react";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signOut, sendPasswordResetEmail } from "firebase/auth";
import classes from "./Password.module.css";

export default function Password() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  let cookies = new Cookie();
  useEffect(() => {
    let userEmail = auth.currentUser.email;

    setEmail(userEmail);
  }, []);

  async function updatePassword() {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setAlert("An email to reset password was sent to you");
      })
      .catch((error) => {
        setAlert(error);
      });

    signOut(auth)
      .then(() => {
        console.log("Sign out done!");
      })
      .catch((error) => {
        console.log(error);
      });
    cookies.remove("firstname");
    cookies.remove("lastname");
    cookies.remove("email");
    cookies.remove("providerId");
    setTimeout(() => {
      navigate("/SignIn");
    }, 2000);
  }

  return (
    <div className={classes.card}>
      <div>Your email is {email}</div>
      <br />
      <div>
        Reset Password?
        <br />
        <br />
        <button onClick={updatePassword}>Proceed</button>
      </div>

      {alert}
    </div>
  );
}
