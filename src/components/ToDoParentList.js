import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoParentList = ({ items, addChildItem, removeItem, editItem }) => {
  return (
    <ul className="todo-parent-list">
      {items.map(item => {
        return (
          <ToDoItem
            key={item.id}
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
