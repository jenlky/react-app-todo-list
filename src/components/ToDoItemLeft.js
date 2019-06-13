import React from "react";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const ToDoItemLeft = ({ id, addChildItem }) => {
  const passIdToAdd = () => {
    const splitId = id.split("-");
    return addChildItem(splitId, []);
  };

  return (
    <div className="todo-item-left-icons">
      <Tooltip
        title="Click to add an item below"
        position="bottom"
        trigger="mouseenter"
        delay="100"
      >
        <span className="todo-item-left-plus" onClick={passIdToAdd}>
          &#xFF0B;
        </span>
      </Tooltip>
      <span
        className="todo-item-left-triangle"
        // onClick={}
      >
        &#x25b6;
      </span>
    </div>
  );
};

export default ToDoItemLeft;
