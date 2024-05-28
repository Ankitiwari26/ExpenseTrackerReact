// import { getAuth, signOut } from "firebase/auth";
// import { useState, useEffect } from "react";
// import { Button, Nav } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const handleLogout = async () => {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     await signOut(auth);
//     console.log("User SignOut");
//     localStorage.removeItem("token");
//   };

//   return (
//     <div>
//       <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//     </div>
//   );
// };
// export default Logout;

import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/index"; // Adjust the import path according to your structure
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    console.log("User signed out");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </div>
  );
};

export default Logout;
