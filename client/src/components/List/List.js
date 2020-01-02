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
    <div className="list">
      <div className="list-name-row">
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
          className="list-remove-list"
          dataTestId="list-cross"
          listId={list.id}
          removeItem={removeItem}
        />
      </div>
      <div>
        <OpenWithIcon
          className="open-with-icon"
          onClick={e => expandOrCollapseAll(true, list.id)}
        />
        <CancelIcon
          className="cancel-icon"
          onClick={e => expandOrCollapseAll(false, list.id)}
        />
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
      <ul className="list-parent">
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
