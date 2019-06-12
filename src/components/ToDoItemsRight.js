import React from "react";

const ToDoItemsRight = ({ item, removeItem }) => {
  const checkId = () => {
    return removeItem(item.id);
  };

  return (
    <div className="todo-item-right-content">
      <span>{item.text}</span>
      <span alt="Cancel" className="todo-item-right-cross" onClick={checkId}>
        &#x2573;
      </span>
    </div>
  );
};

export default ToDoItemsRight;
