import React from "react";

const ToDoItemRight = ({ item, removeItem }) => {
  const passId = () => {
    return removeItem(item.id);
  };

  return (
    <div className="todo-item-right-content">
      <input type="text" value={item.text} className="todo-item-right-input" />
      <span alt="Cancel" className="todo-item-right-cross" onClick={passId}>
        &#x2573;
      </span>
    </div>
  );
};

export default ToDoItemRight;
