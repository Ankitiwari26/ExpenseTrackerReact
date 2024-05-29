import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "./Home";
import { setExpenses, addExpense, toggleTheme } from "../../store/index";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Home component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: {
        list: [],
        totalAmount: 0,
        loading: false,
      },
      theme: {
        isDarkTheme: false,
      },
    });

    fetchMock.resetMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText("Welcome to Expense Tracker")).toBeInTheDocument();
  });

  it("fetches and displays expenses", async () => {
    const mockExpenses = {
      1: { amount: 100, description: "Groceries", category: "Food" },
      2: { amount: 200, description: "Rent", category: "Housing" },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockExpenses));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Groceries")).toBeInTheDocument();
      expect(screen.getByText("Rent")).toBeInTheDocument();
    });
  });

  it("handles premium activation and displays premium buttons", async () => {
    store = mockStore({
      expenses: {
        list: [],
        totalAmount: 10001,
        loading: false,
      },
      theme: {
        isDarkTheme: false,
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText("Activate Premium"));

    expect(screen.getByText("Toggle Theme")).toBeInTheDocument();
    expect(screen.getByText("Download File")).toBeInTheDocument();
  });

  it("toggles theme on button click", async () => {
    store = mockStore({
      expenses: {
        list: [],
        totalAmount: 10001,
        loading: false,
      },
      theme: {
        isDarkTheme: false,
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText("Activate Premium"));
    fireEvent.click(screen.getByText("Toggle Theme"));

    const actions = store.getActions();
    expect(actions).toContainEqual(toggleTheme());
  });

  it("downloads CSV file on button click", async () => {
    const mockExpenses = [
      { id: "1", amount: 100, description: "Groceries", category: "Food" },
      { id: "2", amount: 200, description: "Rent", category: "Housing" },
    ];

    store = mockStore({
      expenses: {
        list: mockExpenses,
        totalAmount: 10001,
        loading: false,
      },
      theme: {
        isDarkTheme: false,
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText("Activate Premium"));

    global.URL.createObjectURL = jest.fn(() => "fakeURL");
    const link = {
      click: jest.fn(),
      setAttribute: jest.fn(),
      remove: jest.fn(),
    };
    document.createElement = jest.fn().mockReturnValue(link);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    fireEvent.click(screen.getByText("Download File"));

    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(link.setAttribute).toHaveBeenCalledWith("href", expect.any(String));
    expect(link.setAttribute).toHaveBeenCalledWith("download", "expenses.csv");
    expect(link.click).toHaveBeenCalled();
  });
});
