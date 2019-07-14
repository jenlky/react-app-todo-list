import React from "react";
import ToDoItemLeft from "./ToDoItemLeft";
import ToDoItemRight from "./ToDoItemRight";

const ListItem = ({ listItem, addSubsequentItem }) => {
  // console.log("listItem", listItem);

  const displayChildCondition =
    (listItem !== undefined || listItem.children.length > 0) &&
    listItem.display === true;

  return (
    <React.Fragment>
      <li className="todo-item break-word">
        <ToDoItemLeft
          listItem={listItem}
          addSubsequentItem={addSubsequentItem}
        />
        <ToDoItemRight listItem={listItem} />
      </li>
      {displayChildCondition && (
        <ul className="todo-child-list">
          {listItem.children.map(listItem => {
            return (
              <ListItem
                key={listItem.id}
                listItem={listItem}
                addSubsequentItem={addSubsequentItem}
              />
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default ListItem;
