import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoParentList from "./ToDoParentList";
import "../styles/ToDoList.css";

const List = ({
  titleHandler,
  title,
  keyInItemHandler,
  handleEnter,
  lists
}) => {
  return (
    <div className="todo-list">
      <Input className="title" onChangeHandler={titleHandler} value={title} />
      <div>
        <Input
          className="todo-input"
          placeholder="Enter your item"
          onChangeHandler={keyInItemHandler}
          handleEnter={handleEnter}
        />
        <Button />
      </div>
      <ToDoParentList lists={lists} />
    </div>
  );
};

export default List;
