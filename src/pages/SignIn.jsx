import Navbar from "../Navbar/Navbar";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";
import GoogleButton from "react-google-button";
import Cookies from "universal-cookie";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { auth, store } from "../firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignIn() {
  const [modal, setModal] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cookies = new Cookies();

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  function loginHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        cookies.set("firstname", data.user.displayName.split(" ")[0], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("lastname", data.user.displayName.split(" ")[1], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("email", data.user.email, {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("providerId", data.providerId, {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });

        navigate("/");

        console.log(data.providerId);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/Invalid-email":
            setModal("Invalid Email");
            break;
          case "auth/invalid-login-credentials":
            setModal("Invalid Login Credentials");
            break;
          case "auth/user-disabled":
            setModal("User Disabled By Administrator");
            break;
          case "auth/user-not-found":
            setModal("User Not Found");
            break;
          case "auth/wrong-password":
            setModal("Wrong Password");
            break;
          default:
        }
      });
  }

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      cookies.set("firstname", result.user.displayName.split(" ")[0], {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      cookies.set("lastname", result.user.displayName.split(" ")[1], {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      cookies.set("email", result.user.email, {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });
      cookies.set("providerId", result.providerId, {
        path: "/",
        maxAge: 3600,
        secure: true,
        sameSite: "none",
      });

      getDocs(
        query(
          collection(store, "usersdetails"),
          where("email", "==", result.user.email)
        )
      ).then((data) => {
        const resultdata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(resultdata[0]);
        if (!resultdata[0]) {
          addDoc(collection(store, "usersdetails"), {
            email: result.user.email,
            name: result.user.displayName,
            telephone: "",
            addresses: [],
          });
        }
      });

      console.log(result.providerId);
      navigate("/");
    });
  };

  const handleFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        cookies.set("firstname", result.user.displayName.split(" ")[0], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("lastname", result.user.displayName.split(" ")[1], {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });
        cookies.set("email", result.user.email, {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "none",
        });

        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function resetPassword() {
    navigate("/ResetPassword");
  }

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <h1> Login Page </h1>{" "}
        <form onSubmit={loginHandler} className={classes.form}>
          <div className={classes.input}>
            <label htmlFor="email"> Registered Email </label>
            <input
              type="email"
              required
              placeholder=" your email here"
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
              placeholder="password"
              id="password"
              ref={passwordInputRef}
              className={classes.inputtext}
            />
          </div>
          <button className={classes.button}> Login </button>
        </form>
        <br />
        <p>
          <a onClick={resetPassword}>Forgot password? Click Here.</a>
        </p>
        <p>{modal}</p>
        OR
        <GoogleButton onClick={handleGoogle} />
        <button className={classes.facebook} onClick={handleFacebook}>
          Sign in with Facebook
        </button>
      </div>
    </>
  );
}
