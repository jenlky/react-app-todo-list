import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const ToDoItemRight = ({ item, removeParentItem, editItem }) => {
  // item.id '1-2' after split becomes ['1','2'] and passed to editItem
  const passIdToEdit = event => {
    const itemId = item.id.split("-");
    const newValue = event.target.value;
    return editItem(newValue, itemId);
  };

  return (
    <div className="todo-item-right-content">
      <input
        type="text"
        value={item.text}
        className="todo-item-right-input"
        onChange={passIdToEdit}
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
          onClick={() => removeParentItem(item.id)}
        >
          &#x2573;
        </span>
      </Tooltip>
    </div>
  );
};

export default ToDoItemRight;
