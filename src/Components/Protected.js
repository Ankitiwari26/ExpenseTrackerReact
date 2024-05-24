import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { currentUser } = auth;
  return currentUser ? children : <Navigate to="/" />;
};
export default Protected;
