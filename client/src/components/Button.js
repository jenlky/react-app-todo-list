import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Button = ({ addFirstItem }) => {
  return (
    <button className="todo-btn tooltip" onClick={addFirstItem}>
      <Tooltip
        title="Add a parent item"
        position="bottom"
        trigger="mouseenter"
        delay="100"
      >
        Add
      </Tooltip>
    </button>
  );
};

export default Button;
