import React from "react";
import Input from "../Input";
import Button from "../Button";
import ListItem from "./ListItem";
import "../../styles/ToDoList.css";

const List = ({
  list,
  name,
  listNameHandler,
  keyInItemHandler,
  addFirstItem,
  handleEnter,
  addSubsequentItem,
  editItem,
  removeItem
}) => {
  return (
    <div className="todo-list">
      <Input className="title" onChangeHandler={listNameHandler} value={name} />
      <div>
        <Input
          className="todo-input"
          placeholder="Enter your item"
          onChangeHandler={keyInItemHandler}
          handleEnter={handleEnter}
        />
        <Button addFirstItem={addFirstItem} />
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
            />
          );
        })}
      </ul>
    </div>
  );
};

export default List;
