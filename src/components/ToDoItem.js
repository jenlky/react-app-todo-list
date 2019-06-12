import React from "react";
import ToDoItemLeft from "./ToDoItemLeft";
import ToDoItemRight from "./ToDoItemRight";
// import { useDrag } from "react-dnd";

const ToDoItem = ({
  item,
  addItem,
  removeItem,
  editFieldHandler,
  editItem
}) => {
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
      <ToDoItemLeft addItem={addItem} />
      <ToDoItemRight item={item} removeItem={removeItem} editItem={editItem} />
    </li>
  );
};

export default ToDoItem;
