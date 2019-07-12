import React from "react";
import App from "../components/App";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react/dist";
import getData from "../service/items-service.js";

jest.mock("../service/items-service.js", () =>
  jest.fn(() => {
    const sampleData = [
      {
        id: 1,
        name: "Week 1",
        listItems: [
          { text: "Git bash", children: [] },
          { text: "Jest", children: [] }
        ]
      }
    ];
    return sampleData;
  })
);

describe("Add list", () => {});

describe("Update list", () => {});

describe("Remove list", () => {});

describe("Add list item", () => {
  it("should add first list item when user clicks add button and clear addItemField after adding", () => {
    // 1. render Component
    const { getByPlaceholderText, getByText, container } = render(<App />);

    // 2. search for the element
    const addItemField = getByPlaceholderText(/enter your item/i);
    const button = getByText(/add/i);

    fireEvent.change(addItemField, { target: { value: "testClick" } });
    fireEvent.click(button);

    const inputs = container.querySelectorAll(".todo-item-right-input");
    const lastInput = inputs[inputs.length - 1];
    console.log(lastInput.value);

    // 3. assert on the element
    expect(lastInput).toHaveValue("testClick");
    expect(addItemField).toHaveValue("");
  });

  it("should not add empty string as parent item when user press enter key", () => {
    const { getByPlaceholderText, container } = render(<App />);

    const addItemField = getByPlaceholderText(/enter your item/i);

    // should not be able to add empty string
    fireEvent.change(addItemField, { target: { value: "" } });
    fireEvent.keyDown(addItemField, { key: "Enter", code: 13 });

    const inputs = container.querySelectorAll(".todo-item-right-input");
    const lastInput = inputs[inputs.length - 1];

    expect(lastInput).toHaveValue("");
  });

  it("should add subsequent list item", () => {});
});

describe("Update list item", () => {
  it("should ", () => {});
});

describe("Remove list item", () => {
  it.only("should remove parent item with its children item if it has any", () => {
    // Angeline: mockImplementation might need reset or what
    getData.mockReturnValueOnce([
      {
        id: 1,
        name: "Week 1",
        listItems: [
          { text: "Git bash", children: [] },
          { text: "Jest", children: [] }
        ]
      },
      {
        id: 2,
        text: "Week 2",
        children: { text: "Git bash", children: [] }
      }
    ]);

    const { container } = render(<App />);
    const crosses = container.querySelectorAll(".todo-item-right-cross");
    const firstCross = crosses[0];
    const inputs = container.querySelectorAll(".todo-item-right-input");
    const secondInput = inputs[1];

    fireEvent.click(firstCross);

    // const inputs = container.querySelectorAll(".todo-item-right-input");

    expect(inputs).toHaveLength(1);
    // first input textContent will be second input textContent
    expect(inputs[0]).toEqual(secondInput);
  });
});

describe("Toggle list item", () => {
  it("should ", () => {});
});
