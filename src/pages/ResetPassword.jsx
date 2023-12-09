import { useRef, useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function ResetPassword() {
  let emailInputRef = useRef();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    console.log(emailInputRef.current.value);
    await sendPasswordResetEmail(auth, emailInputRef.current.value)
      .then(() => {
        setAlert("An email to reset password was sent to you");
        setTimeout(() => {
          navigate("/SignIn");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <h3>Enter the email for witch the password will be reset</h3>

      <input
        type="email"
        required
        placeholder=" your email here"
        id="email"
        ref={emailInputRef}
      />
      <button onClick={resetPassword}>Proceed</button>

      <p>{alert}</p>
    </>
  );
}
