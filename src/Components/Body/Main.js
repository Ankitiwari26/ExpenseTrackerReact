import { useState } from "react";
import { Button } from "react-bootstrap";
import UpdateProfileModal from "./UpdateProfileModal";
import Logout from "./Logout";
const Main = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Logout />
      <h2>Welcome to Expence Tracker</h2>
      <div>
        <label>Your Profile is incomplete</label>
        <Button onClick={handleShow}>Update Profile</Button>
      </div>
      <UpdateProfileModal show={show} handleClose={handleClose} />
    </div>
  );
};
export default Main;
