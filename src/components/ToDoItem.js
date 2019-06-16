import React from "react";
import ToDoItemLeft from "./ToDoItemLeft";
import ToDoItemRight from "./ToDoItemRight";
import ToDoChildList from "./ToDoChildList";

const ToDoItem = ({
  item,
  addChildItem,
  removeItem,
  editItem,
  toggleDisplay
}) => {
  // if (item.children === undefined || item.children.length === 0)
  // console.log(item);
  const displayChildCondition =
    (item.children !== undefined || item.children.length > 0) &&
    item.display === true;

  return (
    <React.Fragment>
      <li className="todo-item break-word">
        <ToDoItemLeft
          id={item.id}
          addChildItem={addChildItem}
          toggleDisplay={toggleDisplay}
        />
        <ToDoItemRight
          item={item}
          removeItem={removeItem}
          editItem={editItem}
        />
      </li>
      {displayChildCondition && (
        <ToDoChildList
          item={item}
          addChildItem={addChildItem}
          removeItem={removeItem}
          editItem={editItem}
          toggleDisplay={toggleDisplay}
        />
      )}
    </React.Fragment>
  );
};

export default ToDoItem;
