import { configureStore, createSlice } from "@reduxjs/toolkit";

// Auth slice
const initialAuthState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;

// Expenses slice
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    totalAmount: 0,
  },
  reducers: {
    setExpenses(state, action) {
      state.list = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
      );
    },
    addExpense(state, action) {
      state.list.push(action.payload);
      state.totalAmount += parseFloat(action.payload.amount);
    },
    editExpense(state, action) {
      const index = state.list.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.totalAmount -= parseFloat(state.list[index].amount);
        state.list[index] = action.payload;
        state.totalAmount += parseFloat(action.payload.amount);
      }
    },
    deleteExpense(state, action) {
      const index = state.list.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.totalAmount -= parseFloat(state.list[index].amount);
        state.list.splice(index, 1);
      }
    },
  },
});

export const { setExpenses, addExpense, editExpense, deleteExpense } =
  expensesSlice.actions;
export const selectTotalAmount = (state) => state.expenses.totalAmount;
const expensesReducer = expensesSlice.reducer;

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;
