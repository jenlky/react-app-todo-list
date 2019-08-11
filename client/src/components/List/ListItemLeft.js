import React from "react";
import Plus from "./Plus";
import RightTriangle from "./RightTriangle";

const ListItemLeft = ({
  listId,
  listItem,
  addSubsequentItem,
  toggleDisplay
}) => {
  const itemId = listItem.id.split("-");

  return (
    <div className="todo-item-left-icons">
      <Plus
        title="Click to add an item below"
        className="todo-item-left-plus"
        listId={listId}
        itemId={itemId}
        addSubsequentItem={addSubsequentItem}
      />
      <RightTriangle
        className={
          listItem.display
            ? "todo-item-left-triangle toggled-triangle"
            : "todo-item-left-triangle"
        }
        listId={listId}
        itemId={itemId}
        toggleDisplay={toggleDisplay}
      />
    </div>
  );
};

export default ListItemLeft;
