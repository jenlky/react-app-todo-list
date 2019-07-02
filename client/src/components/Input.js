import React from "react";

const Input = ({
  className,
  placeholder,
  value,
  onChangeHandler,
  handleEnter
}) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={handleEnter}
    />
  );
};

export default Input;
