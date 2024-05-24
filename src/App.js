import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Body/Authentication/SignUp";
import Login from "./Components/Body/Authentication/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./Components/Body/Authentication/ForgotPasswod";
import Home from "./Components/Body/Home";
import VerifyEmail from "./Components/Body/Authentication/VerifyEmail";
import Protected from "./Components/Protected";
import ExpenseForm from "./Components/Body/ExpenseForm";
import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <h2>Expense Tracker</h2> */}
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route
              path="expenceform"
              element={
                <Protected>
                  <ExpenseForm />
                </Protected>
              }
            />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
