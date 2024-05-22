import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateProfileModal({ show, handleClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
      {/* <Button variant="primary" onClick={show}>
        Update you Profile
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill All the Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Email:</label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div>
              <label htmlFor="Phone Number">Password:</label>
              <input
                type="phnonenumber"
                id="phoennumber"
                value={phone}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProfileModal;
