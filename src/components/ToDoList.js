import React from "react";
import ToDoItems from "./ToDoItems";

const ToDoList = ({ items, removeItem }) => {
  return (
    <ul className="todo-list">
      <ToDoItems items={items} removeItem={removeItem} />
    </ul>
  );
};

export default ToDoList;
