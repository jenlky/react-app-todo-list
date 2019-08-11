import React from "react";
import List from "../components/List/List";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";

describe("List", () => {
  const list = {
    id: 1,
    name: "Week 1",
    listItems: [
      {
        id: "1",
        text: "List item 1",
        children: [],
        display: false
      }
    ]
  };

  it("should render list title, cross, input, add button and list item", () => {
    const { getByTestId } = render(
      <List
        list={list}
        listNameHandler={{}}
        keyInItemHandler={{}}
        addFirstItem={{}}
        handleEnter={{}}
        addSubsequentItem={{}}
        editItem={{}}
        removeItem={{}}
        toggleDisplay={{}}
      />
    );

    expect(getByTestId("list-title")).toBeInTheDocument();
    expect(getByTestId("list-cross")).toBeInTheDocument();
    expect(getByTestId("list-input")).toBeInTheDocument();
    expect(getByTestId("list-add-btn")).toBeInTheDocument();
  });
});
