import React from "react";
import Navbar from "../components/Navbar";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar", () => {
  it("should display signup and login button if user is not logged in", () => {
    const { getByText } = render(
      <Router>
        <Navbar isLoggedIn={false} username="" />
      </Router>
    );

    expect(getByText("Sign up")).toBeInTheDocument();
    expect(getByText("Log in")).toBeInTheDocument();
  });

  it("should route to /signup when user clicks on sign up", () => {
    const { getByText } = render(
      <Router>
        <Navbar isLoggedIn={false} username="" />
      </Router>
    );

    expect(getByText("Sign up")).toBeInTheDocument();
    fireEvent.click(getByText("Sign up"));
    expect(getByText("Sign up")).toBeInTheDocument();
  });

  it("should route to /login when user clicks on log in", () => {
    const { getByText } = render(
      <Router>
        <Navbar isLoggedIn={false} username="" />
      </Router>
    );

    expect(getByText("Log in")).toBeInTheDocument();
    fireEvent.click(getByText("Log in"));
    expect(getByText("Log in")).toBeInTheDocument();
  });

  it("should display username and logout button if user is logged in", () => {
    const { getByText } = render(
      <Router>
        <Navbar isLoggedIn={true} username="Paul" />
      </Router>
    );

    expect(getByText("Paul")).toBeInTheDocument();
    expect(getByText("Log out")).toBeInTheDocument();
  });
});
