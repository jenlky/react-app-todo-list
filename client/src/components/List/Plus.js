import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Plus = ({ addSubsequentItem, idArray }) => {
  return (
    <Tooltip
      title="Click to add an item below"
      position="bottom"
      trigger="mouseenter"
      delay="100"
    >
      <span
        className="todo-item-left-plus"
        onClick={() => addSubsequentItem(idArray)}
      >
        &#xFF0B;
      </span>
    </Tooltip>
  );
};

export default Plus;
