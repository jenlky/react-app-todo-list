import React from "react";
import ListItemLeft from "./ListItemLeft";
import ListItemRight from "./ListItemRight";

const ListItem = ({
  listId,
  listItem,
  addSubsequentItem,
  editItem,
  removeItem,
  toggleDisplay
}) => {
  const displayChildCondition =
    (listItem !== undefined || listItem.children.length > 0) &&
    listItem.display === true;

  return (
    <>
      <li className="todo-item break-word" data-testid="todo-item">
        <ListItemLeft
          listId={listId}
          listItem={listItem}
          addSubsequentItem={addSubsequentItem}
          toggleDisplay={toggleDisplay}
        />
        <ListItemRight
          listId={listId}
          listItem={listItem}
          editItem={editItem}
          removeItem={removeItem}
        />
      </li>
      {displayChildCondition && (
        <ul className="todo-child-list">
          {listItem.children.map(listItem => {
            return (
              <ListItem
                listId={listId}
                key={listItem.id}
                listItem={listItem}
                addSubsequentItem={addSubsequentItem}
                editItem={editItem}
                removeItem={removeItem}
                toggleDisplay={toggleDisplay}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ListItem;
