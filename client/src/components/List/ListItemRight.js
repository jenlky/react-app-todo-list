import React from "react";
import Cross from "./Cross";

const ListItemRight = ({ listId, listItem, editItem, removeItem }) => {
  const itemId = listItem.id.split("-");

  return (
    <div className="todo-item-content">
      <input
        type="text"
        value={listItem.text}
        className="todo-item-input"
        data-testid="todo-item-input"
        onChange={e => editItem(e.target.value, listId, itemId)}
      />
      <Cross
        title="Remove parent and its children"
        className="todo-item-cross"
        dataTestId="todo-item-cross"
        listId={listId}
        itemId={itemId}
        removeItem={removeItem}
      />
    </div>
  );
};

export default ListItemRight;
