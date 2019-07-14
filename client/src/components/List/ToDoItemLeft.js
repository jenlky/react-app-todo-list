import React from "react";
import Plus from "./Plus";
import RightTriangle from "./RightTriangle";

const ToDoItemLeft = ({ listItem, addSubsequentItem }) => {
  return (
    <div className="todo-item-left-icons">
      <Plus id={listItem.id} addSubsequentItem={addSubsequentItem} />
      <RightTriangle display={listItem.display} id={listItem.id} />
    </div>
  );
};

export default ToDoItemLeft;
