import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoChildList from "./ToDoChildList";
import "../styles/ToDoList.css";

const ToDoParentList = ({ items, removeItem, addItem }) => {
  return (
    <ul className="todo-parent-list">
      {items.map(item => {
        // const childItemLength = item.children.length;

        if (item.children === undefined || item.children.length === 0) {
          return (
            <ToDoItem item={item} removeItem={removeItem} addItem={addItem} />
          );
        } else {
          return (
            <React.Fragment>
              <ToDoItem item={item} removeItem={removeItem} addItem={addItem} />
              <ToDoChildList
                item={item}
                removeItem={removeItem}
                addItem={addItem}
              />
            </React.Fragment>
          );
        }
      })}
    </ul>
  );
};

export default ToDoParentList;
