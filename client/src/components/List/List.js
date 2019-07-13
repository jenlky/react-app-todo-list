import React from "react";
import Input from "../Input";
import Button from "../Button";
import ToDoParentList from "./ToDoParentList";
import "../../styles/ToDoList.css";

const List = ({
  name,
  listNameHandler,
  keyInItemHandler,
  addFirstItem,
  handleEnter,
  lists
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
      <ToDoParentList lists={lists} />
    </div>
  );
};

export default List;
