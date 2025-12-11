import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Register from "../components/Register";

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

describe("Register Validation Test", () => {
  it("shows validation errors when form is empty", async () => {
    renderWithProviders(<Register />);

    fireEvent.click(
      screen.getByRole("button", { name: /Create Account/i })
    );
    
    expect(await screen.findByText("username is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is Required")).toBeInTheDocument();
    expect(await screen.findByText("Password is Required")).toBeInTheDocument();
    expect(await screen.findByText("Confirm Password is required")).toBeInTheDocument();


  });

  it("shows error when passwords do not match", async () => {
    renderWithProviders(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "Test User" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@email.com" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "654321" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /create account/i })
    );

    expect(
      await screen.findByText(
        /Passwords must match|Confirm Password is required/i
      )
    ).toBeInTheDocument();
  });
});
