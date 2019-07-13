import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Cross = ({ id, removeItem }) => {
  return (
    <Tooltip
      title="Remove parent and its children"
      position="bottom"
      trigger="mouseenter"
      delay="100"
    >
      <span
        alt="Cancel"
        className="todo-item-right-cross"
        // onClick={() => removeItem(id)}
      >
        &#x2573;
      </span>
    </Tooltip>
  );
};

export default Cross;
