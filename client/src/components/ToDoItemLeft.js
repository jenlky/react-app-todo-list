import React from "react";
import Plus from "./Plus";
import RightTriangle from "./RightTriangle";

const ToDoItemLeft = ({ item, addChildItem, toggleDisplay }) => {
  // item.id '1-2' after split becomes ['1','2'] and passed to addChildItem
  const itemId = item.id.split("-");

  return (
    <div className="todo-item-left-icons">
      <Plus id={itemId} addChildItem={addChildItem} />
      <RightTriangle
        display={item.display}
        id={itemId}
        toggleDisplay={toggleDisplay}
      />
    </div>
  );
};

export default ToDoItemLeft;
