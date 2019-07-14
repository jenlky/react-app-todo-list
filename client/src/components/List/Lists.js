import React from "react";
import List from "./List";
import "../../styles/ToDoList.css";

const Lists = ({
  lists,
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
    <React.Fragment>
      {lists.map(list => {
        return (
          <List
            key={list.id}
            list={list}
            listNameHandler={listNameHandler}
            keyInItemHandler={keyInItemHandler}
            addFirstItem={addFirstItem}
            handleEnter={handleEnter}
            addSubsequentItem={addSubsequentItem}
            editItem={editItem}
            removeItem={removeItem}
            toggleDisplay={toggleDisplay}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Lists;
