import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const ToDoItemRight = ({ item, removeItem, editItem }) => {
  // item.id '1-2' after split becomes ['1','2'] and passed to editItem
  const itemId = item.id.split("-");

  return (
    <div className="todo-item-right-content">
      <input
        type="text"
        value={item.text}
        className="todo-item-right-input"
        onChange={event => editItem(event.target.value, itemId)}
      />
      <Tooltip
        title="Remove parent and its children"
        position="bottom"
        trigger="mouseenter"
        delay="100"
      >
        <span
          alt="Cancel"
          className="todo-item-right-cross"
          onClick={() => removeItem(itemId)}
        >
          &#x2573;
        </span>
      </Tooltip>
    </div>
  );
};

export default ToDoItemRight;
