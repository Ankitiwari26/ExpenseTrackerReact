import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const handleEdit = (expense) => {
    setEditingExpenseId(expense.id);
    setEditedAmount(expense.amount);
    setEditedDescription(expense.description);
    setEditedCategory(expense.category);
  };

  const handleSaveEdit = () => {
    const editedExpense = {
      id: editingExpenseId,
      amount: editedAmount,
      description: editedDescription,
      category: editedCategory,
    };
    editExpense(editedExpense);
    setEditingExpenseId(null);
    setEditedAmount("");
    setEditedDescription("");
    setEditedCategory("");
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setEditedAmount("");
    setEditedDescription("");
    setEditedCategory("");
  };

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-list-item">
          {editingExpenseId === expense.id ? (
            <>
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <Button onClick={handleSaveEdit}>Save</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </>
          ) : (
            <>
              <span className="amount">Amount: {expense.amount}</span>
              <span className="description">
                Description: {expense.description}
              </span>
              <span className="category">Category: {expense.category}</span>
              <Button onClick={() => handleEdit(expense)}>Edit</Button>
              <Button onClick={() => deleteExpense(expense.id)}>Delete</Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
