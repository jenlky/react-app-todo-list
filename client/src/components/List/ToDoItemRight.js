import React from "react";
import Cross from "./Cross";

const ToDoItemRight = ({ listItem }) => {
  return (
    <div className="todo-item-right-content">
      <input
        type="text"
        value={listItem.text}
        className="todo-item-right-input"
        onChange={() => "ToDoItemRight onChange method"}
      />
      <Cross />
    </div>
  );
};

export default ToDoItemRight;
