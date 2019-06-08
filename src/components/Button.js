import React from "react";

const Button = ({ handleClick }) => {
  return (
    <button className="todo-btn" onClick={handleClick}>
      Add Todo
    </button>
  );
};

export default Button;
