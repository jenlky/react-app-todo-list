import React from "react";

const Button = ({ addItem }) => {
  return (
    <button className="todo-btn" onClick={addItem}>
      Add Todo
    </button>
  );
};

export default Button;
