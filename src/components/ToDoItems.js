import React from "react";
// import { useDrag } from "react-dnd";

function ToDoItems({ items }) {
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
        className="todo-item"
        key={item}
      >
        {item}
      </li>
    );
  });
}

export default ToDoItems;
