import React from "react";

const Input = ({ searchField, handleKeyDown }) => {
  return (
    <input
      className="todo-input"
      type="text"
      onChange={searchField}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
