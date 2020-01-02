import React from "react";
import Button from "../Button";
import ListItem from "./ListItem";
import Cross from "./Cross";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import CancelIcon from "@material-ui/icons/Cancel";

export default function List({
  list,
  listNameHandler,
  keyInItemHandler,
  addFirstItem,
  handleEnter,
  addSubsequentItem,
  editItem,
  removeItem,
  toggleDisplay,
  expandOrCollapseAll
}) {
  return (
    <div className="todo-list">
      <div className="todo-list-name-row">
        <input
          type="text"
          className="title"
          placeholder="List name"
          value={list.name}
          data-testid="list-title"
          onChange={e => listNameHandler(e, list.id)}
          onKeyDown={e => handleEnter(e, list.id)}
        />
        <Cross
          title="Remove list"
          className="todo-list-remove-list"
          dataTestId="list-cross"
          listId={list.id}
          removeItem={removeItem}
        />
      </div>
      <div>
        <OpenWithIcon onClick={e => expandOrCollapseAll(true, list.id)} />
        <CancelIcon onClick={e => expandOrCollapseAll(false, list.id)} />
        <input
          type="text"
          className="list-input"
          data-testid="list-input"
          placeholder="Enter your item"
          onChange={e => keyInItemHandler(e, list.id)}
          onKeyDown={e => handleEnter(e, list.id)}
        />
        <Button
          className="list-add-btn tooltip"
          addFirstItem={addFirstItem}
          listId={list.id}
          dataTestId="list-add-btn"
        />
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
}
