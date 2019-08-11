import React from "react";

const RightTriangle = ({ className, listId, itemId, toggleDisplay }) => {
  return (
    <span
      className={className}
      data-testid="todo-item-right-triangle"
      onClick={() => toggleDisplay(listId, itemId)}
    >
      &#x25b6;
    </span>
  );
};

export default RightTriangle;
