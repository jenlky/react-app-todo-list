import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoChildList = ({ item, ...splitId }) => {
  return (
    <ul className="todo-child-list">
      {item.children.map(childItem => {
        // console.log(childItem.id);

        return <ToDoItem item={childItem} {...splitId} />;
      })}
    </ul>
  );
};

export default ToDoChildList;
