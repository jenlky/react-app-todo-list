import React from "react";
import Button from "../Button";
import ListItem from "./ListItem";
import Cross from "./Cross";

const List = ({
  list,
  listNameHandler,
  keyInItemHandler,
  addFirstItem,
  handleEnter,
  addSubsequentItem,
  editItem,
  removeItem,
  toggleDisplay
}) => {
  return (
    <div className="todo-list">
      <div className="todo-list-name-row">
        <input
          type="text"
          className="title"
          placeholder="List name"
          value={list.name}
          onChange={e => listNameHandler(e, list.id)}
          onKeyDown={e => handleEnter(e, list.id)}
        />
        <Cross
          title="Remove list"
          className="todo-list-remove-list"
          listId={list.id}
          removeItem={removeItem}
        />
      </div>
      <div>
        <input
          type="text"
          className="todo-input"
          placeholder="Enter your item"
          onChange={e => keyInItemHandler(e, list.id)}
          onKeyDown={e => handleEnter(e, list.id)}
        />
        <Button addFirstItem={addFirstItem} listId={list.id} />
      </div>
      <ul className="todo-parent-list">
        {list.listItems.map(listItem => {
          return (
            <ListItem
              key={listItem.id}
              listId={list.id}
              listItem={listItem}
              addSubsequentItem={addSubsequentItem}
              editItem={editItem}
              removeItem={removeItem}
              toggleDisplay={toggleDisplay}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;
