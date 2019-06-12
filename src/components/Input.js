import React from "react";

const Input = ({ keyInItemHandler, handleKeyDown }) => {
  return (
    <input
      type="text"
      placeholder="Enter your item"
      className="todo-input"
      onChange={keyInItemHandler}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
