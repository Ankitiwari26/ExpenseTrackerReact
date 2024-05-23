import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { setToken } = auth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    if (email.trim() === "" || password.trim() === "") {
      alert("Please Enter Valid Email and Password");
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = userCredentials.user.getIdToken();

      console.log(token);
      // setToken(token);
      console.log("User loggedin in successfully", userCredentials, token);

      localStorage.setItem("token", token);
    } catch (error) {
      alert("Please Enter Valid Email and Password");
    } finally {
      setEmail("");
      setPassword("");
    }
    navigate("/verifyemail");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>

      <div className="forgot-password">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </form>
  );
}

export default Login;
