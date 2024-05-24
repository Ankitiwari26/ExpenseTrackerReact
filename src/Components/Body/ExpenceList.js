import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expenses }) => {
  return (
    <ul className="expense-list">
      {expenses.map((expense, index) => (
        <li key={index} className="expense-list-item">
          <span className="amount">Amount: {expense.amount}</span>
          <span className="description">
            Description: {expense.description}
          </span>
          <span className="category">Category: {expense.category}</span>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
