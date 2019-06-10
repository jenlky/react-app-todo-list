import React from "react";

const Input = ({ searchField, handleKeyDown }) => {
  return (
    <input
      type="text"
      className="todo-input"
      onChange={searchField}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
