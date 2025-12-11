import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Login from "../components/Login"; 


import userReducer from "../features/UserSlice";
import productReducer from "../features/ProductSlice";


const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      users: userReducer,
      products: productReducer,
    },
    preloadedState,
  });
};


const renderWithProviders = (component, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("Login Page Validation Test", () => {
  it("shows validation errors when fields are empty", async () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("shows error when email is invalid", async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrongemail" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
  });
});
