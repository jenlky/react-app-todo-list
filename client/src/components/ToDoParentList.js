import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoParentList = ({
  items,
  addChildItem,
  removeItem,
  editItem,
  toggleDisplay
}) => {
  return (
    <ul className="todo-parent-list">
      {items.map(item => {
        return (
          <ToDoItem
            key={item.id}
            item={item}
            addChildItem={addChildItem}
            removeItem={removeItem}
            editItem={editItem}
            toggleDisplay={toggleDisplay}
          />
        );
      })}
    </ul>
  );
};

export default ToDoParentList;
