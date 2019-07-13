import React from "react";
import ToDoItemLeft from "./ToDoItemLeft";
import ToDoItemRight from "./ToDoItemRight";
import ToDoChildList from "./ToDoChildList";

const ToDoItem = ({ listItem }) => {
  const displayChildCondition =
    (listItem !== undefined || listItem.length > 0) &&
    listItem.display === true;

  return (
    <React.Fragment>
      <li className="todo-item break-word">
        <ToDoItemLeft listItem={listItem} />
        <ToDoItemRight listItem={listItem} />
      </li>
      {displayChildCondition && <ToDoChildList listItem={listItem} />}
    </React.Fragment>
  );
};

export default ToDoItem;
