import React from "react";
import ListItem from "../components/List/ListItem";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";

describe("ListItem", () => {
  const listItem = {
    id: "1",
    text: "Testing list item id 1",
    children: [
      {
        id: "1-1",
        text: "Testing list item id 1-1",
        children: [],
        display: false
      }
    ],
    display: true
  };

  it("should display plus, right triangle, input and cross", () => {
    const listItem = {
      id: "1",
      text: "",
      display: false
    };

    const { getByTestId } = render(
      <ListItem
        listId="1"
        listItem={listItem}
        addSubsequentItem={{}}
        editItem={{}}
        removeItem={{}}
        toggleDisplay={{}}
      />
    );

    expect(getByTestId("todo-item-plus")).toBeInTheDocument();
    expect(getByTestId("todo-item-right-triangle")).toBeInTheDocument();
    expect(getByTestId("todo-item-input")).toBeInTheDocument();
    expect(getByTestId("todo-item-cross")).toBeInTheDocument();
  });

  it("should render parent listItem and its children listItem", () => {
    const { getAllByTestId } = render(
      <ListItem
        listId="1"
        listItem={listItem}
        addSubsequentItem={{}}
        editItem={{}}
        removeItem={{}}
        toggleDisplay={{}}
      />
    );

    expect(getAllByTestId("todo-item").length).toBe(2);
    expect(getAllByTestId("todo-item-input")[0]).toHaveValue(
      "Testing list item id 1"
    );
    expect(getAllByTestId("todo-item-input")[1]).toHaveValue(
      "Testing list item id 1-1"
    );
  });
});
