import React from "react";

const ToDoItems = ({ items }) => {
  return items.map(item => {
    return (
      <li className="todo-items" key={item}>
        {item}
      </li>
    );
  });
};

export default ToDoItems;
