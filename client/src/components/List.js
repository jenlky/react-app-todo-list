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
  addParentItem,
  items,
  addChildItem,
  removeItem,
  editItem,
  toggleDisplay
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
        <Button addParentItem={addParentItem} />
      </div>
      <ToDoParentList
        items={items}
        addChildItem={addChildItem}
        removeItem={removeItem}
        editItem={editItem}
        toggleDisplay={toggleDisplay}
      />
    </div>
  );
};

export default List;
