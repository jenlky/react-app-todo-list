import React from "react";
import ListItemLeft from "./ListItemLeft";
import ListItemRight from "./ListItemRight";

const ListItem = ({ listItem, addSubsequentItem, editItem, removeItem }) => {
  // console.log("listItem", listItem);

  const displayChildCondition =
    (listItem !== undefined || listItem.children.length > 0) &&
    listItem.display === true;

  return (
    <React.Fragment>
      <li className="todo-item break-word">
        <ListItemLeft
          listItem={listItem}
          addSubsequentItem={addSubsequentItem}
        />
        <ListItemRight
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
                key={listItem.id}
                listItem={listItem}
                addSubsequentItem={addSubsequentItem}
                editItem={editItem}
                removeItem={removeItem}
              />
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default ListItem;
