import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoChildList = ({ item, removeItem, addItem }) => {
  return (
    <ul className="todo-child-list">
      {item.children.map(childItem => {
        // console.log(childItem.id);

        return (
          <ToDoItem
            item={childItem}
            removeItem={removeItem}
            addItem={addItem}
          />
        );
      })}
    </ul>
  );
};

export default ToDoChildList;
