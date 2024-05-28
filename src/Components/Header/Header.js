// // import { Button } from "react-bootstrap";
// // import Container from "react-bootstrap/Container";
// // import Nav from "react-bootstrap/Nav";
// // import Navbar from "react-bootstrap/Navbar";
// // import { Link, useNavigate } from "react-router-dom";
// // import Logout from "../Body/Authentication/Logout";
// // import { useState, useEffect } from "react";
// // import UpdateProfileModal from "../Body/UpdateProfileModal";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";

// // function Header() {
// //   const [show, setShow] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);

// //   useEffect(() => {
// //     const auth = getAuth();
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         setIsLoggedIn(true);
// //       } else {
// //         setIsLoggedIn(false);
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const handleHomeClick = () => {
// //     if (isLoggedIn) {
// //       navigate("/home");
// //     } else {
// //       navigate("/");
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar expand="lg" className="bg-body-tertiary">
// //         <Container>
// //           <Navbar.Brand href="#home">Expence Tracker</Navbar.Brand>
// //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //           <Navbar.Collapse id="basic-navbar-nav">
// //             <Nav className="me-auto">
// //               <Nav.Link as={Link} to="#" onClick={handleHomeClick}>
// //                 Home
// //               </Nav.Link>
// //               <Nav.Link as={Link} to="/">
// //                 Login
// //               </Nav.Link>
// //               {/* <Button onClick={handleShow}>Update Profile</Button> */}

// //               <Nav.Link onClick={handleShow}>Update Profile</Nav.Link>

// //               <Logout />

// //               {console.log("logout button clicked")}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //       <UpdateProfileModal show={show} handleClose={handleClose} />
// //     </>
// //   );
// // }

// // export default Header;

// import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "../../store/index";
// import Logout from "../Body/Authentication/Logout";
// import UpdateProfileModal from "../Body/UpdateProfileModal";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// function Header() {
//   const [show, setShow] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleHomeClick = () => {
//     if (isLoggedIn) {
//       navigate("/home");
//     } else {
//       navigate("/");
//     }
//   };

//   const handleToggleTheme = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <>
//       <Navbar
//         expand="lg"
//         className={
//           isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"
//         }
//       >
//         <Container>
//           <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link as={Link} to="#" onClick={handleHomeClick}>
//                 Home
//               </Nav.Link>
//               <Nav.Link as={Link} to="/">
//                 Login
//               </Nav.Link>
//               <Nav.Link onClick={handleShow}>Update Profile</Nav.Link>
//               <Logout />
//               <Button variant="outline-secondary" onClick={handleToggleTheme}>
//                 Toggle Theme
//               </Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <UpdateProfileModal show={show} handleClose={handleClose} />
//     </>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../Body/Authentication/Logout";
import UpdateProfileModal from "../Body/UpdateProfileModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={
          isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }
      >
        <Container>
          <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="#" onClick={handleHomeClick}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
              <Nav.Link onClick={handleShow}>Update Profile</Nav.Link>
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UpdateProfileModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Header;
