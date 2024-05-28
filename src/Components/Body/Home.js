// // // import React, { useCallback, useState, useEffect } from "react";

// // // import Protected from "../Protected";
// // // import ExpenseForm from "./ExpenseForm";
// // // import ExpenseList from "./ExpenceList";

// // // const Home = () => {

// // //   const [expenses, setExpenses] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   const fetchExpenseData = useCallback(() => {
// // //     setLoading(true);
// // //     fetch(
// // //       "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json"
// // //     )
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         if (data) {
// // //           const transformedExpense = Object.keys(data).map((key) => {
// // //             const expense = data[key];
// // //             return {
// // //               id: key,
// // //               amount: expense.amount,
// // //               description: expense.description,
// // //               category: expense.category,
// // //             };
// // //           });
// // //           setExpenses(transformedExpense);
// // //         }
// // //         setLoading(false);
// // //       })
// // //       .catch((error) => {
// // //         console.log("Something went wrong ....Retrying ", error);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   const handleAddExpense = async (expense) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json",
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify(expense),
// // //         }
// // //       );
// // //       if (response.ok) {
// // //         fetchExpenseData();
// // //       }
// // //     } catch (error) {
// // //       console.log("Error adding expense: ", error);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEditExpense = async (expense) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expense.id}.json`,
// // //         {
// // //           method: "PUT",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({
// // //             amount: expense.amount,
// // //             description: expense.description,
// // //             category: expense.category,
// // //           }),
// // //         }
// // //       );
// // //       if (response.ok) {
// // //         fetchExpenseData();
// // //       }
// // //       console.log("Expense edited from the list.");
// // //     } catch (error) {
// // //       console.log("Error editing expense: ", error);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteExpense = async (expenseId) => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         `https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata/${expenseId}.json`,
// // //         {
// // //           method: "DELETE",
// // //         }
// // //       );
// // //       if (response.ok) {
// // //         fetchExpenseData();
// // //       }
// // //       console.log("Expense deleted from the list.");
// // //     } catch (error) {
// // //       console.log("Error deleting expense: ", error);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchExpenseData();
// // //   }, [fetchExpenseData]);

// // //   return (
// // //     <div>
// // //       <h2>Welcome to Expense Tracker</h2>
// // //       <Protected>
// // //         <ExpenseForm addExpense={handleAddExpense} />
// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : (
// // //           <ExpenseList
// // //             expenses={expenses}
// // //             editExpense={handleEditExpense}
// // //             deleteExpense={handleDeleteExpense}
// // //           />
// // //         )}
// // //       </Protected>
// // //     </div>
// // //   );
// // // };

// // // export default Home;

// // import React, { useCallback, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Button } from "react-bootstrap";
// // import Protected from "../Protected";
// // import ExpenseForm from "./ExpenseForm";
// // import ExpenseList from "./ExpenseList";
// // import {
// //   setExpenses,
// //   addExpense,
// //   editExpense,
// //   deleteExpense,
// //   toggleTheme,
// // } from "../../store/index";

// // const Home = () => {
// //   const dispatch = useDispatch();
// //   const expenses = useSelector((state) => state.expenses.list);
// //   const totalAmount = useSelector((state) => state.expenses.totalAmount);
// //   const loading = useSelector((state) => state.expenses.loading);
// //   const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

// //   const fetchExpenseData = useCallback(() => {
// //     dispatch({ type: "expenses/loading", payload: true });
// //     fetch(
// //       "https://expencetracker-90de3-default-rtdb.firebaseio.com/expensedata.json"
// //     )
// //       .then((response) => response.json())
// //       .then((data) => {
// //         if (data) {
// //           const transformedExpenses = Object.keys(data).map((key) => ({
// //             id: key,
// //             ...data[key],
// //           }));
// //           dispatch(setExpenses(transformedExpenses));
// //         }
// //         dispatch({ type: "expenses/loading", payload: false });
// //       })
// //       .catch((error) => {
// //         console.log("Something went wrong ....Retrying ", error);
// //         dispatch({ type: "expenses/loading", payload: false });
// //       });
// //   }, [dispatch]);

// //   const handleAddExpense = async (expense) => {
// //     dispatch({ type: "expenses/loading", payload: true });
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
// //       dispatch(addExpense());
// //     } catch (error) {
// //       console.log("Error adding expense: ", error);
// //       dispatch({ type: "expenses/loading", payload: false });
// //     }
// //   };

// //   const handleActivatePremium = () => {
// //     dispatch(toggleTheme());
// //     console.log("Activate primium button clicked");
// //   };

// //   const handleDownloadCSV = () => {
// //     const csvContent =
// //       "data:text/csv;charset=utf-8," +
// //       "Amount,Description,Category\n" +
// //       expenses
// //         .map((exp) => `${exp.amount},${exp.description},${exp.category}`)
// //         .join("\n");
// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.setAttribute("href", encodedUri);
// //     link.setAttribute("download", "expenses.csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   useEffect(() => {
// //     fetchExpenseData();
// //   }, [fetchExpenseData]);

// //   return (
// //     <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
// //       <h2>Welcome to Expense Tracker</h2>
// //       <Protected>
// //         <ExpenseForm addExpense={handleAddExpense} />
// //         {totalAmount > 10000 && (
// //           <div>
// //             <Button variant="warning" onClick={handleActivatePremium}>
// //               Activate Premium
// //             </Button>
// //             <Button variant="secondary" onClick={handleDownloadCSV}>
// //               Download File
// //             </Button>
// //           </div>
// //         )}
// //         {loading ? <p>Loading...</p> : <ExpenseList expenses={expenses} />}
// //       </Protected>
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useCallback, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import Protected from "../Protected";
// import ExpenseForm from "./ExpenseForm";
// import ExpenseList from "./ExpenseList";
// import {
//   setExpenses,
//   addExpense,
//   editExpense,
//   deleteExpense,
//   toggleTheme,
// } from "../../store/index";

// const Home = () => {
//   const dispatch = useDispatch();
//   const expenses = useSelector((state) => state.expenses.list);
//   const totalAmount = useSelector((state) => state.expenses.totalAmount);
//   const loading = useSelector((state) => state.expenses.loading);
//   const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

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
//       dispatch(addExpense());
//     } catch (error) {
//       console.log("Error adding expense: ", error);
//       dispatch({ type: "expenses/loading", payload: false });
//     }
//   };

//   const handleActivatePremium = () => {
//     dispatch(toggleTheme());
//     console.log("Activate Premium button clicked");
//   };

//   const handleDownloadCSV = () => {
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       "Amount,Description,Category\n" +
//       expenses
//         .map((exp) => `${exp.amount},${exp.description},${exp.category}`)
//         .join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "expenses.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     fetchExpenseData();
//   }, [fetchExpenseData]);

//   return (
//     <div
//       style={{
//         backgroundColor: isDarkTheme ? "#333" : "#fff",
//         color: isDarkTheme ? "#fff" : "#000",
//       }}
//     >
//       <h2>Welcome to Expense Tracker</h2>
//       <Protected>
//         <ExpenseForm addExpense={handleAddExpense} />
//         {totalAmount > 10000 && (
//           <div>
//             <Button variant="warning" onClick={handleActivatePremium}>
//               Activate Premium
//             </Button>
//             <Button variant="secondary" onClick={handleDownloadCSV}>
//               Download File
//             </Button>
//           </div>
//         )}
//         {loading ? <p>Loading...</p> : <ExpenseList expenses={expenses} />}
//       </Protected>
//     </div>
//   );
// };

// export default Home;

import React, { useCallback, useEffect, useState } from "react";
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
  toggleTheme,
} from "../../store/index";

const Home = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const loading = useSelector((state) => state.expenses.loading);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const [premiumActivated, setPremiumActivated] = useState(false);

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
      dispatch(addExpense());
    } catch (error) {
      console.log("Error adding expense: ", error);
      dispatch({ type: "expenses/loading", payload: false });
    }
  };

  const handleActivatePremium = () => {
    setPremiumActivated(true);
  };

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Amount,Description,Category\n" +
      expenses
        .map((exp) => `${exp.amount},${exp.description},${exp.category}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  return (
    <div
      style={{
        backgroundColor: isDarkTheme ? "#333" : "#fff",
        color: isDarkTheme ? "#fff" : "#000",
      }}
    >
      <h2>Welcome to Expense Tracker</h2>
      <Protected>
        <ExpenseForm addExpense={handleAddExpense} />
        {totalAmount > 10000 && (
          <div>
            <Button variant="warning" onClick={handleActivatePremium}>
              Activate Premium
            </Button>
          </div>
        )}
        {premiumActivated && (
          <div>
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(toggleTheme())}
            >
              Toggle Theme
            </Button>
            <Button variant="secondary" onClick={handleDownloadCSV}>
              Download File
            </Button>
          </div>
        )}
        {loading ? <p>Loading...</p> : <ExpenseList expenses={expenses} />}
      </Protected>
    </div>
  );
};

export default Home;
