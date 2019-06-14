import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import { render, getByText } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react/dist";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("onChange, keyDown, onClick handler", () => {
  it("should ", () => {});
});
