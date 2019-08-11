import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Plus = ({ title, className, addSubsequentItem, listId, itemId }) => {
  return (
    <Tooltip title={title} position="bottom" trigger="mouseenter" delay="100">
      <span
        className={className}
        data-testid="todo-item-plus"
        onClick={() => addSubsequentItem(listId, itemId)}
      >
        &#xFF0B;
      </span>
    </Tooltip>
  );
};

export default Plus;
