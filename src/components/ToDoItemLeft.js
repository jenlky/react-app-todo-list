import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const ToDoItemLeft = ({ item, addChildItem, toggleDisplay }) => {
  // item.id '1-2' after split becomes ['1','2'] and passed to addChildItem
  const itemId = item.id.split("-");

  return (
    <div className="todo-item-left-icons">
      <Tooltip
        title="Click to add an item below"
        position="bottom"
        trigger="mouseenter"
        delay="100"
      >
        <span
          className="todo-item-left-plus"
          onClick={() => addChildItem(itemId)}
        >
          &#xFF0B;
        </span>
      </Tooltip>
      <span
        className={
          item.display
            ? "todo-item-left-triangle toggled-triangle"
            : "todo-item-left-triangle"
        }
        onClick={() => toggleDisplay(itemId)}
      >
        &#x25b6;
      </span>
    </div>
  );
};

export default ToDoItemLeft;
