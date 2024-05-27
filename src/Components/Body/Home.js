// // import React, { useCallback, useState, useEffect } from "react";

// // import Protected from "../Protected";
// // import ExpenseForm from "./ExpenseForm";
// // import ExpenseList from "./ExpenceList";

// // const Home = () => {

// //   const [expenses, setExpenses] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const fetchExpenseData = useCallback(() => {
// //     setLoading(true);
// //     fetch(
// //       "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json"
// //     )
// //       .then((response) => response.json())
// //       .then((data) => {
// //         if (data) {
// //           const transformedExpense = Object.keys(data).map((key) => {
// //             const expense = data[key];
// //             return {
// //               id: key,
// //               amount: expense.amount,
// //               description: expense.description,
// //               category: expense.category,
// //             };
// //           });
// //           setExpenses(transformedExpense);
// //         }
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         console.log("Something went wrong ....Retrying ", error);
// //         setLoading(false);
// //       });
// //   }, []);

// //   const handleAddExpense = async (expense) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(expense),
// //         }
// //       );
// //       if (response.ok) {
// //         fetchExpenseData();
// //       }
// //     } catch (error) {
// //       console.log("Error adding expense: ", error);
// //       setLoading(false);
// //     }
// //   };

// //   const handleEditExpense = async (expense) => {
// //     setLoading(true);
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
// //         fetchExpenseData();
// //       }
// //       console.log("Expense edited from the list.");
// //     } catch (error) {
// //       console.log("Error editing expense: ", error);
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteExpense = async (expenseId) => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(
// //         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expenseId}.json`,
// //         {
// //           method: "DELETE",
// //         }
// //       );
// //       if (response.ok) {
// //         fetchExpenseData();
// //       }
// //       console.log("Expense deleted from the list.");
// //     } catch (error) {
// //       console.log("Error deleting expense: ", error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchExpenseData();
// //   }, [fetchExpenseData]);

// //   return (
// //     <div>
// //       <h2>Welcome to Expense Tracker</h2>
// //       <Protected>
// //         <ExpenseForm addExpense={handleAddExpense} />
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <ExpenseList
// //             expenses={expenses}
// //             editExpense={handleEditExpense}
// //             deleteExpense={handleDeleteExpense}
// //           />
// //         )}
// //       </Protected>
// //     </div>
// //   );
// // };

// // export default Home;

// // src/Components/Body/Home.js
// import React, { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import Protected from "../Protected";
// import ExpenseForm from "./ExpenseForm";
// import ExpenceList from "./ExpenceList";

// import {
//   setExpenses,
//   addExpense,
//   editExpense,
//   deleteExpense,
// } from "../../store/index";

// const Home = () => {
//   const dispatch = useDispatch();
//   const expenses = useSelector((state) => state.expenses.list);
//   const totalAmount = useSelector((state) => state.expenses.totalAmount);
//   const loading = useSelector((state) => state.expenses.loading);

//   const fetchExpenseData = useCallback(() => {
//     dispatch({ type: "expenses/loading", payload: true });
//     fetch(
//       "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           const transformedExpenses = Object.keys(data).map((key) => ({
//             id: key,
//             ...data[key],
//           }));
//           dispatch(setExpenses(transformedExpenses));
//         }
//         dispatch({ type: "expenses/loading", payload: false });
//       })
//       .catch((error) => {
//         console.log("Something went wrong ....Retrying ", error);
//         dispatch({ type: "expenses/loading", payload: false });
//       });
//   }, [dispatch]);

//   const handleAddExpense = async (expense) => {
//     dispatch({ type: "expenses/loading", payload: true });
//     try {
//       const response = await fetch(
//         "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(expense),
//         }
//       );
//       if (response.ok) {
//         fetchExpenseData();
//       }
//     } catch (error) {
//       console.log("Error adding expense: ", error);
//       dispatch({ type: "expenses/loading", payload: false });
//     }
//   };

//   useEffect(() => {
//     fetchExpenseData();
//   }, [fetchExpenseData]);

//   return (
//     <div>
//       <h2>Welcome to Expense Tracker</h2>
//       <Protected>
//         <ExpenseForm addExpense={handleAddExpense} />
//         {totalAmount > 10000 && (
//           <Button variant="warning">Activate Premium</Button>
//         )}
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ExpenceList
//             expenses={expenses}
//             // onEdit={handleEditExpense}
//             // onDelete={handleDeleteExpense}
//           />
//         )}
//       </Protected>
//     </div>
//   );
// };

// export default Home;

// src/Components/Body/Home.js
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Protected from "../Protected";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import {
  setExpenses,
  addExpense,
  editExpense,
  deleteExpense,
} from "../../store/index";

const Home = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const loading = useSelector((state) => state.expenses.loading);

  const fetchExpenseData = useCallback(() => {
    dispatch({ type: "expenses/loading", payload: true });
    fetch(
      "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const transformedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(setExpenses(transformedExpenses));
        }
        dispatch({ type: "expenses/loading", payload: false });
      })
      .catch((error) => {
        console.log("Something went wrong ....Retrying ", error);
        dispatch({ type: "expenses/loading", payload: false });
      });
  }, [dispatch]);

  const handleAddExpense = async (expense) => {
    dispatch({ type: "expenses/loading", payload: true });
    try {
      const response = await fetch(
        "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      );
      if (response.ok) {
        fetchExpenseData();
      }
    } catch (error) {
      console.log("Error adding expense: ", error);
      dispatch({ type: "expenses/loading", payload: false });
    }
  };

  const handleEditExpense = async (expense) => {
    dispatch({ type: "expenses/loading", payload: true });
    try {
      const response = await fetch(
        `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expense.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
          }),
        }
      );
      if (response.ok) {
        fetchExpenseData();
      }
      console.log("Expense edited from the list.");
    } catch (error) {
      console.log("Error editing expense: ", error);
      dispatch({ type: "expenses/loading", payload: false });
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    dispatch({ type: "expenses/loading", payload: true });
    try {
      const response = await fetch(
        `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchExpenseData();
      }
      console.log("Expense deleted from the list.");
    } catch (error) {
      console.log("Error deleting expense: ", error);
      dispatch({ type: "expenses/loading", payload: false });
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      <Protected>
        <ExpenseForm addExpense={handleAddExpense} />
        {totalAmount > 10000 && (
          <Button variant="warning">Activate Premium</Button>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}
      </Protected>
    </div>
  );
};

export default Home;
