import React from "react";
// import { useDrag } from "react-dnd";
import cancel from "../assets/cancel.svg";

const ToDoItems = ({ items, removeItem }) => {
  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: "LIST_ITEMS" },
  //   collect: monitor => ({
  //     isDragging: !!monitor.isDragging()
  //   })
  // });

  return items.map(item => {
    return (
      <li
        // ref={drag}
        // style={{ opacity: isDragging ? 0.5 : 1 }}
        className="todo-item break-word"
        key={item}
      >
        <div className="todo-left-icons">
          <span className="todo-item-plus">＋</span>
          <span className="dropdown-triangle">▶&nbsp;</span>
        </div>
        <div className="todo-item-content">
          <span>{item}</span>
          <img
            src={cancel}
            alt="Cancel"
            className="todo-item-cross"
            onClick={removeItem}
          />
        </div>
        {/* <span className="todo-item-cross">⨉</span> */}
      </li>
    );
  });
};

export default ToDoItems;
