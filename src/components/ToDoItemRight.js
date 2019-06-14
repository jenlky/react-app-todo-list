import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const ToDoItemRight = ({ item, removeItem, editItem }) => {
  const passIdToEdit = event => {
    const itemId = item.id.split("-");
    const newValue = event.target.value;

    // console.log("in passIdToEdit", editItem);
    // console.log("item in passIdToEdit", item);
    return editItem(newValue, itemId, []);
  };

  // console.log("in ToDoItemRight", editItem);

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
          onClick={() => removeItem(item.id)}
        >
          &#x2573;
        </span>
      </Tooltip>
    </div>
  );
};

export default ToDoItemRight;
