import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

const ToDoParentList = ({ lists }) => {
  console.log(lists);

  return (
    <ul className="todo-parent-list">
      {lists.listItems.map(listItem => {
        return <ToDoItem key={lists.id} listItem={listItem} />;
      })}
    </ul>
  );
};

export default ToDoParentList;
