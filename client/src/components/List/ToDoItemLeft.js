import React from "react";
import Plus from "./Plus";
import RightTriangle from "./RightTriangle";

const ToDoItemLeft = ({ listItem }) => {
  return (
    <div className="todo-item-left-icons">
      <Plus id={listItem} />
      <RightTriangle display={listItem.display} id={listItem} />
    </div>
  );
};

export default ToDoItemLeft;
