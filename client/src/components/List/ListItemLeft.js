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
    <div className="list-item-icons">
      <Plus
        title="Click to add an item below"
        className="list-item-plus"
        listId={listId}
        itemId={itemId}
        addSubsequentItem={addSubsequentItem}
      />
      <RightTriangle
        className={
          listItem.display
            ? "list-item-right-triangle toggled-triangle"
            : "list-item-right-triangle"
        }
        listId={listId}
        itemId={itemId}
        toggleDisplay={toggleDisplay}
      />
    </div>
  );
};

export default ListItemLeft;
