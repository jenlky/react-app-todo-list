import React from "react";

const RightTriangle = ({ display, listId, itemId, toggleDisplay }) => {
  return (
    <span
      className={
        display
          ? "todo-item-left-triangle toggled-triangle"
          : "todo-item-left-triangle"
      }
      onClick={() => toggleDisplay(listId, itemId)}
    >
      &#x25b6;
    </span>
  );
};

export default RightTriangle;
