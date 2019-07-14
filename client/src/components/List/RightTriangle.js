import React from "react";

const RightTriangle = ({ display, idArray, toggleDisplay }) => {
  return (
    <span
      className={
        display
          ? "todo-item-left-triangle toggled-triangle"
          : "todo-item-left-triangle"
      }
      onClick={() => toggleDisplay(idArray)}
    >
      &#x25b6;
    </span>
  );
};

export default RightTriangle;
