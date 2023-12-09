import Navbar from "../Navbar/Navbar";
import classes from "./SignUp.module.css";
import { useRef } from "react";
import { useState } from "react";
import { auth, store } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

export default function SignIn() {
  const [emailError, setEmailError] = useState("");

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  function registerHandler(event) {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        updateProfile(auth.currentUser, { displayName: name });
        addDoc(collection(store, "usersdetails"), {
          email: email,
          name: name,
          telephone: "",
          addresses: [],
        });
        console.log(data);
        navigate("/SignIn");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError("Email already in use!");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid Email");
            break;
          case "auth/weak-password":
            setEmailError("Weak Password");
            break;

          default:
        }
      });
  }

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <h1> Register Page </h1>
        <form onSubmit={registerHandler} className={classes.form}>
          <div className={classes.input}>
            <label htmlFor="name"> Name </label>
            <input
              type="text"
              placeholder="Name"
              required
              id="name"
              ref={nameInputRef}
              className={classes.inputtext}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              required
              placeholder="Your Email"
              id="email"
              ref={emailInputRef}
              className={classes.inputtext}
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              required
              placeholder="Your Password"
              id="password"
              ref={passwordInputRef}
              className={classes.inputtext}
            />
          </div>
          <button className={classes.button}> Register </button>
        </form>
        <p>{emailError}</p>
      </div>
    </div>
  );
}
