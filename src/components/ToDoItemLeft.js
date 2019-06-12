import React from "react";

const ToDoItemLeft = ({ addItem }) => {
  return (
    <div className="todo-item-left-icons">
      <span className="todo-item-left-plus" onClick={addItem}>
        &#xFF0B;
      </span>
      <span
        className="todo-item-left-triangle"
        // onClick={}
      >
        &#x25b6;
      </span>
    </div>
  );
};

export default ToDoItemLeft;
