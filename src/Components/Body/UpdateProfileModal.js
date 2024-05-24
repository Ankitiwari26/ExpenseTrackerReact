import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAuth, updateProfile } from "firebase/auth";
import "./UpdateProfileModal.css"; // Import the CSS file

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
      alert("Please Login to Update Profile");
    } finally {
      setName("");
      setPhotoURL("");
    }
  };

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
