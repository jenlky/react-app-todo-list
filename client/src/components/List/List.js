import React from "react";
import Button from "../Button";
import ListItem from "./ListItem";
import "../../styles/ToDoList.css";

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
      <input
        type="text"
        className="title"
        placeholder="Enter your item"
        value={list.name}
        onChange={e => listNameHandler(e, list.id)}
        onKeyDown={e => handleEnter(e, list.id)}
      />
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
