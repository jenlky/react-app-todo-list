import React from "react";
import Input from "../Input";
import Button from "../Button";
import FirstListItems from "./FirstListItems";
import "../../styles/ToDoList.css";

const List = ({
  lists,
  name,
  listNameHandler,
  keyInItemHandler,
  addFirstItem,
  handleEnter
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
      <FirstListItems lists={lists} />
    </div>
  );
};

export default List;
