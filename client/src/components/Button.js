import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Button = ({ className, dataTestId, addFirstItem, listId }) => {
  return (
    <button
      className={className}
      data-testid={dataTestId}
      onClick={e => addFirstItem(e, listId)}
    >
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
