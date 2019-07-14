import React from "react";
import Plus from "./Plus";
import RightTriangle from "./RightTriangle";

const ListItemLeft = ({ listItem, addSubsequentItem }) => {
  const idArray = listItem.id.split("-");

  return (
    <div className="todo-item-left-icons">
      <Plus idArray={idArray} addSubsequentItem={addSubsequentItem} />
      <RightTriangle display={listItem.display} id={listItem.id} />
    </div>
  );
};

export default ListItemLeft;
