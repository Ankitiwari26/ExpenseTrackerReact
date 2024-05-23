import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";

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
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
export default Logout;
