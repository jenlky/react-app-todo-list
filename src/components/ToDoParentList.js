import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoParentList = ({ items, removeItem, addChildItem, editItem }) => {
  return (
    <ul className="todo-parent-list">
      {items.map(item => {
        return (
          <ToDoItem
            item={item}
            removeItem={removeItem}
            addChildItem={addChildItem}
            editItem={editItem}
          />
        );
      })}
    </ul>
  );
};

export default ToDoParentList;
