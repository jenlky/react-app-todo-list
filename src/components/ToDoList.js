import React from "react";
import ToDoItems from "./ToDoItems";

const ToDoList = ({ items }) => {
  return (
    <ul>
      <ToDoItems items={items} />
    </ul>
  );
};

export default ToDoList;
