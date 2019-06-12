import React from "react";
import ToDoItemsLeft from "./ToDoItemsLeft";
import ToDoItemsRight from "./ToDoItemsRight";
// import { useDrag } from "react-dnd";

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
        key={item.id}
      >
        <ToDoItemsLeft />
        <ToDoItemsRight item={item} removeItem={removeItem} />
      </li>
    );
  });
};

export default ToDoItems;
