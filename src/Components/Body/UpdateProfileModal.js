// // import { updateProfile } from "firebase/auth";
// // import { useState } from "react";
// // import Button from "react-bootstrap/Button";
// // import Modal from "react-bootstrap/Modal";
// // import { auth } from "../../firebase";

// // function UpdateProfileModal({ show, handleClose }) {
// //   const [name, setName] = useState("");
// //   const [photoURL, setPhotoURL] = useState("");

// //   const handleNameChange = (e) => {
// //     setName(e.target.value);
// //   };

// //   const handlePhotoURLChange = (e) => {
// //     setPhotoURL(e.target.value);
// //   };

// //   const token = localStorage.getItem("token");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     // const URL =
// //     //   "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwLC6MnNKHXySAzDS9JLzCjVpcWG01AA8";

// //     const requestBody = {
// //       // idToken: token,
// //       displayName: name,
// //       photoUrl: photoURL,
// //       returnSecureToken: true,
// //     };

// //     const user = auth.currentUser;

// //     try {
// //       const response = await user.updateProfile(auth, name, photoURL);
// //       console.log("User Profile Updated Successfully");

// //       // const response = await fetch(URL, {
// //       //   method: "POST",
// //       //   body: JSON.stringify(requestBody),
// //       //   headers: {
// //       //     "Content-Type": "application/json",
// //       //   },
// //       // });
// //       // if (!response.ok) {
// //       //   throw new Error("Failed to update user profile");
// //       // }
// //       // const data = await response.json();
// //       // console.log(data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <>
// //       <Modal show={show} onHide={handleClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Fill All the Details</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <form onSubmit={handleSubmit}>
// //             <div>
// //               <label htmlFor="name">Name:</label>
// //               <input
// //                 type="text"
// //                 id="name"
// //                 value={name}
// //                 onChange={handleNameChange}
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label htmlFor="photoURL">Photo URL:</label>
// //               <input
// //                 type="text"
// //                 id="photoURL"
// //                 value={photoURL}
// //                 onChange={handlePhotoURLChange}
// //                 required
// //               />
// //             </div>
// //             <Button variant="primary" type="submit">
// //               Submit
// //             </Button>
// //           </form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleClose}>
// //             Close
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </>
// //   );
// // }

// // export default UpdateProfileModal;

// import { updateProfile } from "firebase/auth";
// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { auth } from "../../firebase";

// function UpdateProfileModal({ show, handleClose }) {
//   const [name, setName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handlePhotoURLChange = (e) => {
//     setPhotoURL(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = auth.currentUser;

//     if (user) {
//       try {
//         await updateProfile(user, {
//           displayName: name,
//           photoURL: photoURL,
//         });
//         console.log("User Profile Updated Successfully");
//       } catch (error) {
//         console.log("Error updating profile:", error);
//       }
//     } else {
//       console.log("No user is signed in");
//     }
//     setName("");
//     setPhotoURL("");
//   };

//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Fill All the Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={handleNameChange}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="photoURL">Photo URL:</label>
//               <input
//                 type="text"
//                 id="photoURL"
//                 value={photoURL}
//                 onChange={handlePhotoURLChange}
//                 required
//               />
//             </div>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default UpdateProfileModal;

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAuth, updateProfile } from "firebase/auth";

function UpdateProfileModal({ show, handleClose }) {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhotoURLChange = (e) => {
    setPhotoURL(e.target.value);
  };

  const fetchUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDwLC6MnNKHXySAzDS9JLzCjVpcWG01AA8`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      if (data.users && data.users.length > 0) {
        const userData = data.users[0];
        setName(userData.displayName || "");
        setPhotoURL(userData.photoUrl || "");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchUserData();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
      console.log("User Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill All the Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div>
              <label htmlFor="photoURL">Photo URL:</label>
              <input
                type="text"
                id="photoURL"
                value={photoURL}
                onChange={handlePhotoURLChange}
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProfileModal;
