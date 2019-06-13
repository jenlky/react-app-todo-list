import React from "react";
import ToDoItemLeft from "./ToDoItemLeft";
import ToDoItemRight from "./ToDoItemRight";
// import { useDrag } from "react-dnd";

const ToDoItem = ({ item, addChildItem, removeItem, splitId }) => {
  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: "LIST_ITEMS" },
  //   collect: monitor => ({
  //     isDragging: !!monitor.isDragging()
  //   })
  // });
  // console.log(item.id);

  return (
    <li
      // ref={drag}
      // style={{ opacity: isDragging ? 0.5 : 1 }}
      className="todo-item break-word"
      key={item.id}
    >
      <ToDoItemLeft id={item.id} addChildItem={addChildItem} />
      <ToDoItemRight item={item} removeItem={removeItem} splitId={splitId} />
    </li>
  );
};

export default ToDoItem;
