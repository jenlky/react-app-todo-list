import React from "react";
// import cancel from "../assets/cancel.svg";

const ToDoItemsRight = ({ item, removeItem }) => {
  return (
    <div className="todo-item-right-content">
      <span>{item}</span>
      <span alt="Cancel" className="todo-item-right-cross" onClick={removeItem}>
        &#x2573;
      </span>
      {/* <img
        src={cancel}
        alt="Cancel"
        className="todo-item-cross"
        onClick={removeItem}
      /> */}
    </div>
  );
};

export default ToDoItemsRight;
