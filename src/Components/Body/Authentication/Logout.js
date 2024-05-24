import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const handleLogout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    await signOut(auth);
    console.log("User SignOut");
    localStorage.removeItem("token");
  };

  return (
    <div>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </div>
  );
};
export default Logout;
