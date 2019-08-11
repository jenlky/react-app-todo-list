import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Cross = ({
  title,
  dataTestId,
  className,
  listId,
  itemId,
  removeItem
}) => {
  return (
    <Tooltip title={title} position="bottom" trigger="mouseenter" delay="100">
      <span
        alt="Cancel"
        className={className}
        data-testid={dataTestId}
        onClick={() => removeItem(listId, itemId)}
      >
        &#x2573;
      </span>
    </Tooltip>
  );
};

export default Cross;
