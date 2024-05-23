import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Body/Authentication/SignUp";
import Login from "./Components/Body/Authentication/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./Components/Body/Authentication/ForgotPasswod";
import Main from "./Components/Body/Main";
import VerifyEmail from "./Components/Body/Authentication/VerifyEmail";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <h2>Expense Tracker</h2> */}
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
