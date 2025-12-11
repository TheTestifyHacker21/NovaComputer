import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Products from "../components/Products";
import ProductInfo from "../components/productInfo";
import Stores from "../components/Stores";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Register from "../components/Register";
import AdminLogin from "../components/adminLogin";
import AdminDashboard from "../components/AdminDashboard";
import Payment from "../components/Payment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


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




describe("Home Page", () => {
  it("renders Home page", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Build Your Dream PC/i)).toBeInTheDocument();
  });
});

describe("About Page", () => {
  it("renders About page", () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });
});

describe("Contact Page", () => {
  it("renders Contact page", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });
});

describe("Products Page", () => {
  it("renders Products page", () => {
    renderWithProviders(<Products />);
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
  });
});

describe("Product Info Page", () => {
  it("renders Product Info page", () => {
    renderWithProviders(<ProductInfo />);
    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});

describe("Stores Page", () => {
  it("renders Stores page", () => {
    renderWithProviders(<Stores />);
    expect(screen.getByText(/Find a Store Near You/i)).toBeInTheDocument();
  });
});

describe("Profile Page", () => {
  it("renders Profile page", () => {
    renderWithProviders(<Profile />);
    expect(screen.getByText(/nothing/i)).toBeInTheDocument();
  });
});

describe("Login Page", () => {
  it("renders Login page", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});

describe("Register Page", () => {
  it("renders Register page", () => {
    renderWithProviders(<Register />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});

describe("Admin Login Page", () => {
  it("renders Admin Login page", () => {
    renderWithProviders(<AdminLogin />);
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
  });
});

describe("Admin Dashboard Page", () => {
  it("renders Admin Dashboard page", () => {
    renderWithProviders(<AdminDashboard />);
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
  });
});

describe("Payment Page", () => {
  it("renders Payment page", () => {
    renderWithProviders(<Payment />);
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });
});


describe("Navbar Component", () => {
  it("renders Navbar", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  it("renders Footer", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/Premium PC components at unbeatable prices/i)).toBeInTheDocument();
  });
});
