import React from "react";

const Input = ({ searchField, handleKeyDown }) => {
  return (
    <input
      type="text"
      placeholder="Enter your item"
      className="todo-input"
      onChange={searchField}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
