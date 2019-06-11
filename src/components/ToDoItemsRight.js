import React from "react";
import cancel from "../assets/cancel.svg";

const ToDoItemsRight = ({ item, removeItem }) => {
  return (
    <div className="todo-item-content">
      <span>{item}</span>
      <img
        src={cancel}
        alt="Cancel"
        className="todo-item-cross"
        onClick={removeItem}
      />
    </div>
  );
};

export default ToDoItemsRight;
