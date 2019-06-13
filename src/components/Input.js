import React from "react";

const Input = ({ keyInItemHandler, handleEnter }) => {
  return (
    <input
      type="text"
      placeholder="Enter your item"
      className="todo-input"
      onChange={keyInItemHandler}
      onKeyDown={handleEnter}
    />
  );
};

export default Input;
