import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUp.css"; // Import the CSS file
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("prevent default chalega");
    e.preventDefault();
    console.log("prevent default chala?");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Proceed with form submission logic
      try {
        await createUserWithEmailAndPassword(auth, email, confirmPassword);
        const user = auth.currentUser;
        console.log(user, "User Created");
        console.log("Form submitted successfully");
      } catch (error) {
        console.log(error, "Error in creating new User");
        if (error) {
          alert("Already have an account!! Please Sign in");
        }
      } finally {
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        setError("");
      }

      // You can add your login logic here
    }
  };

  return (
    <Form className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </Form.Group>

      {error && <p className="error-message">{error}</p>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <span className="">
        Already have an account?{" "}
        <Link to="/login" className="sign-in-link">
          Login
        </Link>
      </span>
    </Form>
  );
}

export default SignUp;
