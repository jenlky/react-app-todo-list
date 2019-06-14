import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoChildList = ({ item, ...editItem }) => {
  return (
    <React.Fragment>
      <ul className="todo-child-list">
        {item.children.map(childItem => {
          return <ToDoItem item={childItem} {...editItem} />;
        })}
      </ul>
    </React.Fragment>
  );
};

export default ToDoChildList;
