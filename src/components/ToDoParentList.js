import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoChildList from "./ToDoChildList";
import "../styles/ToDoList.css";

const ToDoParentList = ({ items, ...editItem }) => {
  return (
    <ul className="todo-parent-list">
      {items.map(item => {
        if (item.children === undefined || item.children.length === 0) {
          return <ToDoItem item={item} {...editItem} />;
        } else {
          return (
            <React.Fragment>
              <ToDoItem item={item} {...editItem} />
              <ToDoChildList item={item} {...editItem} />
            </React.Fragment>
          );
        }
      })}
    </ul>
  );
};

export default ToDoParentList;
