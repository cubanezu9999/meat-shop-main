import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Password from "../components/profile/Password";
import Address from "../components/profile/Address";
import Telephone from "../components/profile/Telephone";
import classes from "./Profile.module.css";
import DeleteAccount from "../components/profile/DeleteAccount";

export default function Profile() {
  const [email, setEmail] = useState(true);
  const [address, setAddress] = useState(false);
  const [telephone, setTelephone] = useState(false);
  const [deleteanAccount, setDeleteanAccount] = useState(false);

  function changeEmail() {
    setEmail(true);
    setAddress(false);
    setTelephone(false);
    setDeleteanAccount(false);
  }

  function changeAddress() {
    setAddress(true);
    setTelephone(false);
    setEmail(false);
    setDeleteanAccount(false);
  }
  function changeTelephone() {
    setTelephone(true);
    setAddress(false);
    setEmail(false);
    setDeleteanAccount(false);
  }

  function deleteAccount() {
    setTelephone(false);
    setAddress(false);
    setEmail(false);
    setDeleteanAccount(true);
  }

  return (
    <>
      <Navbar />
      <div className={classes.page}>
        <ul className={classes.container}>
          <li onClick={changeEmail}>Password</li>
          <li onClick={changeAddress}>Address</li>
          <li onClick={changeTelephone}>Telephone</li>
          <li onClick={deleteAccount}>Delete Account?</li>
        </ul>
        <div className={classes.content}>
          {email && <Password />}
          {address && <Address />}
          {telephone && <Telephone />}
          {deleteanAccount && <DeleteAccount />}
        </div>
      </div>
    </>
  );
}
