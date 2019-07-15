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
        listId={listId}
        itemId={itemId}
        addSubsequentItem={addSubsequentItem}
      />
      <RightTriangle
        display={listItem.display}
        listId={listId}
        itemId={itemId}
        toggleDisplay={toggleDisplay}
      />
    </div>
  );
};

export default ListItemLeft;
