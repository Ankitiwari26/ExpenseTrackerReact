import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./ExpenseForm.css";

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      amount,
      description,
      category,
    };
    addExpense(expense);
    setAmount("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <div className="expense-form-container">
      <h2>Add Your Expense Here!!!!!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Petrol</option>
            <option>Salary</option>
            <option>Entertainment</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default ExpenseForm;
