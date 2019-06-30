import React from "react";
import Cross from "./Cross";

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
      <Cross id={itemId} removeItem={removeItem} />
    </div>
  );
};

export default ToDoItemRight;
