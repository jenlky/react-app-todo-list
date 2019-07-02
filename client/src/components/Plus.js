import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Plus = ({ addChildItem, id }) => {
  return (
    <Tooltip
      title="Click to add an item below"
      position="bottom"
      trigger="mouseenter"
      delay="100"
    >
      <span className="todo-item-left-plus" onClick={() => addChildItem(id)}>
        &#xFF0B;
      </span>
    </Tooltip>
  );
};

export default Plus;