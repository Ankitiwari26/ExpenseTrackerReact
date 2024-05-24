import { useState } from "react";
import { Button } from "react-bootstrap";
import UpdateProfileModal from "./UpdateProfileModal";
import Protected from "../Protected";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenceList";

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };
  return (
    <div>
      <h2>Welcome to Expence Tracker</h2>
      <Protected>
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} />
      </Protected>

      <div></div>
    </div>
  );
};
export default Home;
