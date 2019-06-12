import React from "react";

const ToDoItemRight = ({ item, removeItem, editItem }) => {
  const passId = event => {
    return editItem(event, item.id);
  };

  return (
    <div className="todo-item-right-content">
      <input
        type="text"
        value={item.text}
        className="todo-item-right-input"
        onChange={passId}
      />
      {/* <span>{item.text}</span> */}
      <span
        alt="Cancel"
        className="todo-item-right-cross"
        onClick={() => removeItem(item.id)}
      >
        &#x2573;
      </span>
    </div>
  );
};

export default ToDoItemRight;
