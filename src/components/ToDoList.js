import React from "react";
import ToDoItems from "./ToDoItems";

const ToDoList = ({ items }) => {
  return (
    <ul className="todo-list">
      <ToDoItems items={items} />
    </ul>
  );
};

export default ToDoList;
