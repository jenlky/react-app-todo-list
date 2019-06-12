import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoChildList = ({ item, ...editItem }) => {
  return (
    <ul className="todo-child-list">
      {item.children.map(childItem => {
        // console.log(childItem.id);

        return <ToDoItem item={childItem} {...editItem} />;
      })}
    </ul>
  );
};

export default ToDoChildList;
