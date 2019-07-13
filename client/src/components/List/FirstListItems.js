import React from "react";
import ListItem from "./ListItem";
import "../../styles/ToDoList.css";

const FirstListItems = ({ lists }) => {
  return (
    <ul className="todo-parent-list">
      {lists.listItems.map((listItem, index) => {
        return <ListItem key={index} listItem={listItem} />;
      })}
    </ul>
  );
};

export default FirstListItems;
