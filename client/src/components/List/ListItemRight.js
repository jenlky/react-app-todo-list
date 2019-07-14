import React from "react";
import Cross from "./Cross";

const ListItemRight = ({ listItem, editItem, removeItem }) => {
  const idArray = listItem.id.split("-");

  return (
    <div className="todo-item-right-content">
      <input
        type="text"
        value={listItem.text}
        className="todo-item-right-input"
        onChange={e => editItem(e.target.value, idArray)}
      />
      <Cross idArray={idArray} removeItem={removeItem} />
    </div>
  );
};

export default ListItemRight;
