// // // import React, { useState } from "react";
// // // import { Button } from "react-bootstrap";
// // // import "./ExpenseList.css";

// // // const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
// // //   const [editingExpenseId, setEditingExpenseId] = useState(null);
// // //   const [editedAmount, setEditedAmount] = useState("");
// // //   const [editedDescription, setEditedDescription] = useState("");
// // //   const [editedCategory, setEditedCategory] = useState("");

// // //   const handleEdit = (expense) => {
// // //     setEditingExpenseId(expense.id);
// // //     setEditedAmount(expense.amount);
// // //     setEditedDescription(expense.description);
// // //     setEditedCategory(expense.category);
// // //   };

// // //   const handleSaveEdit = () => {
// // //     const editedExpense = {
// // //       id: editingExpenseId,
// // //       amount: editedAmount,
// // //       description: editedDescription,
// // //       category: editedCategory,
// // //     };
// // //     editExpense(editedExpense);
// // //     setEditingExpenseId(null);
// // //     setEditedAmount("");
// // //     setEditedDescription("");
// // //     setEditedCategory("");
// // //   };

// // //   const handleCancelEdit = () => {
// // //     setEditingExpenseId(null);
// // //     setEditedAmount("");
// // //     setEditedDescription("");
// // //     setEditedCategory("");
// // //   };

// // //   return (
// // //     <ul className="expense-list">
// // //       {expenses.map((expense) => (
// // //         <li key={expense.id} className="expense-list-item">
// // //           {editingExpenseId === expense.id ? (
// // //             <>
// // //               <input
// // //                 type="number"
// // //                 value={editedAmount}
// // //                 onChange={(e) => setEditedAmount(e.target.value)}
// // //               />
// // //               <input
// // //                 type="text"
// // //                 value={editedDescription}
// // //                 onChange={(e) => setEditedDescription(e.target.value)}
// // //               />
// // //               <select
// // //                 value={editedCategory}
// // //                 onChange={(e) => setEditedCategory(e.target.value)}
// // //               >
// // //                 <option value="Food">Food</option>
// // //                 <option value="Petrol">Petrol</option>
// // //                 <option value="Salary">Salary</option>
// // //                 <option value="Entertainment">Entertainment</option>
// // //               </select>
// // //               <Button onClick={handleSaveEdit}>Save</Button>
// // //               <Button onClick={handleCancelEdit}>Cancel</Button>
// // //             </>
// // //           ) : (
// // //             <>
// // //               <span className="amount">Amount: {expense.amount}</span>
// // //               <span className="description">
// // //                 Description: {expense.description}
// // //               </span>
// // //               <span className="category">Category: {expense.category}</span>
// // //               <Button onClick={() => handleEdit(expense)}>Edit</Button>
// // //               <Button onClick={() => deleteExpense(expense.id)}>Delete</Button>
// // //             </>
// // //           )}
// // //         </li>
// // //       ))}
// // //     </ul>
// // //   );
// // // };

// // // export default ExpenseList;

// // // src/Components/Body/ExpenseList.js
// // import React from "react";
// // import { useDispatch } from "react-redux";
// // import { editExpense, deleteExpense } from "../../store/index";
// // import "./ExpenseList.css";

// // const ExpenseList = ({ expenses }) => {
// //   const dispatch = useDispatch();

// //   const handleEdit = async (expense) => {
// //     dispatch({ type: "expenses/loading", payload: true });
// //     try {
// //       const response = await fetch(
// //         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expense.id}.json`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             amount: expense.amount,
// //             description: expense.description,
// //             category: expense.category,
// //           }),
// //         }
// //       );
// //       if (response.ok) {
// //       }
// //       console.log("Expense edited from the list.");
// //     } catch (error) {
// //       console.log("Error editing expense: ", error);
// //       dispatch({ type: "expenses/loading", payload: false });
// //     }
// //   };

// //   // (id, updatedExpense) => {

// //   //   dispatch(editExpense({ id, ...updatedExpense }));
// //   // };

// //   const handleDelete = (id) => {
// //     dispatch(deleteExpense({ id }));
// //   };

// //   return (
// //     <ul className="expense-list">
// //       {expenses.map((expense) => (
// //         <li key={expense.id} className="expense-list-item">
// //           <span className="amount">Amount: {expense.amount}</span>
// //           <span className="description">
// //             Description: {expense.description}
// //           </span>
// //           <span className="category">Category: {expense.category}</span>
// //           <button
// //             onClick={() =>
// //               handleEdit(expense.id, {
// //                 amount: "new amount",
// //                 description: "new description",
// //                 category: "new category",
// //               })
// //             }
// //           >
// //             Edit
// //           </button>
// //           <button onClick={() => handleDelete(expense.id)}>Delete</button>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // };

// // export default ExpenseList;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { editExpense, deleteExpense } from "../../store/index";
// import { Button } from "react-bootstrap";
// import "./ExpenseList.css";

// const ExpenseList = ({ expenses }) => {
//   const dispatch = useDispatch();
//   const [editingExpenseId, setEditingExpenseId] = useState(null);
//   const [editedAmount, setEditedAmount] = useState("");
//   const [editedDescription, setEditedDescription] = useState("");
//   const [editedCategory, setEditedCategory] = useState("");

//   const handleEdit = (expense) => {
//     setEditingExpenseId(expense.id);
//     setEditedAmount(expense.amount);
//     setEditedDescription(expense.description);
//     setEditedCategory(expense.category);
//   };

//   const handleSaveEdit = async () => {
//     const editedExpense = {
//       id: editingExpenseId,
//       amount: editedAmount,
//       description: editedDescription,
//       category: editedCategory,
//     };

//     dispatch({ type: "expenses/loading", payload: true });
//     try {
//       const response = await fetch(
//         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${editedExpense.id}.json`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: editedExpense.amount,
//             description: editedExpense.description,
//             category: editedExpense.category,
//           }),
//         }
//       );

//       if (response.ok) {
//         dispatch(editExpense(editedExpense));
//         console.log("Expense edited successfully.");
//       }
//     } catch (error) {
//       console.log("Error editing expense: ", error);
//     } finally {
//       dispatch({ type: "expenses/loading", payload: false });
//     }

//     setEditingExpenseId(null);
//     setEditedAmount("");
//     setEditedDescription("");
//     setEditedCategory("");
//   };

//   const handleCancelEdit = () => {
//     setEditingExpenseId(null);
//     setEditedAmount("");
//     setEditedDescription("");
//     setEditedCategory("");
//   };

//   const handleDelete = async (id) => {
//     dispatch({ type: "expenses/loading", payload: true });
//     try {
//       const response = await fetch(
//         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${id}.json`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         dispatch(deleteExpense(id));
//         console.log("Expense deleted successfully.");
//       } else {
//         console.log("Failed to delete expense from server.");
//       }
//     } catch (error) {
//       console.log("Error deleting expense: ", error);
//     } finally {
//       dispatch({ type: "expenses/loading", payload: false });
//     }
//   };

//   return (
//     <ul className="expense-list">
//       {expenses.map((expense) => (
//         <li key={expense.id} className="expense-list-item">
//           {editingExpenseId === expense.id ? (
//             <>
//               <input
//                 type="number"
//                 value={editedAmount}
//                 onChange={(e) => setEditedAmount(e.target.value)}
//               />
//               <input
//                 type="text"
//                 value={editedDescription}
//                 onChange={(e) => setEditedDescription(e.target.value)}
//               />
//               <select
//                 value={editedCategory}
//                 onChange={(e) => setEditedCategory(e.target.value)}
//               >
//                 <option value="Food">Food</option>
//                 <option value="Petrol">Petrol</option>
//                 <option value="Salary">Salary</option>
//                 <option value="Entertainment">Entertainment</option>
//               </select>
//               <Button onClick={handleSaveEdit}>Save</Button>
//               <Button onClick={handleCancelEdit}>Cancel</Button>
//             </>
//           ) : (
//             <>
//               <span className="amount">Amount: {expense.amount}</span>
//               <span className="description">
//                 Description: {expense.description}
//               </span>
//               <span className="category">Category: {expense.category}</span>
//               <Button onClick={() => handleEdit(expense)}>Edit</Button>
//               <Button onClick={() => handleDelete(expense.id)}>Delete</Button>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ExpenseList;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, editExpense, selectTotalAmount } from "../../store";
import { Button } from "react-bootstrap";
import "./ExpenseList.css";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(selectTotalAmount);
  const expenses = useSelector((state) => state.expenses.list);
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

  const handleSaveEdit = async () => {
    const editedExpense = {
      id: editingExpenseId,
      amount: editedAmount,
      description: editedDescription,
      category: editedCategory,
    };

    dispatch({ type: "expenses/loading", payload: true });
    try {
      const response = await fetch(
        `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${editedExpense.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: editedExpense.amount,
            description: editedExpense.description,
            category: editedExpense.category,
          }),
        }
      );

      if (response.ok) {
        dispatch(editExpense(editedExpense));
        console.log("Expense edited successfully.");
      }
    } catch (error) {
      console.log("Error editing expense: ", error);
    } finally {
      dispatch({ type: "expenses/loading", payload: false });
    }

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

  const handleDelete = async (id) => {
    dispatch({ type: "expenses/loading", payload: true });
    try {
      const response = await fetch(
        `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(deleteExpense({ id }));
        console.log("Expense deleted successfully.");
      } else {
        console.log("Failed to delete expense from server.");
      }
    } catch (error) {
      console.log("Error deleting expense: ", error);
    } finally {
      dispatch({ type: "expenses/loading", payload: false });
    }
  };

  return (
    <div>
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
                <Button onClick={() => handleDelete(expense.id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
