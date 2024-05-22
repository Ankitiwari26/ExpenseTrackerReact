import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter valid email");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Link to reset password is sent please check your mail");
    } catch (error) {
      console.log("Error in reseting the passwprd", error);
    } finally {
      setEmail("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};
export default ForgotPassword;
