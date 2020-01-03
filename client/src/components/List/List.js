import React from "react";
import ListItem from "./ListItem";
import Cross from "./Cross";
import expand from "../../assets/expand-24.png";
import collapse from "../../assets/collapse-24.png";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tooltip: {
    fontSize: "1.05rem",
    backgroundColor: "black"
  }
}));

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
  const classes = useStyles();

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
        <Tooltip
          title="Expand all"
          aria-label="expand-all"
          classes={{ tooltip: classes.tooltip }}
        >
          <img
            className="expand-icon"
            src={expand}
            alt="Expand all"
            onClick={e => expandOrCollapseAll(true, list.id)}
          />
        </Tooltip>
        <Tooltip
          title="Collapse all"
          aria-label="collapse-all"
          classes={{ tooltip: classes.tooltip }}
        >
          <img
            className="collapse-icon"
            src={collapse}
            alt="Collapse all"
            onClick={e => expandOrCollapseAll(false, list.id)}
          />
        </Tooltip>
        <input
          type="text"
          className="list-input"
          data-testid="list-input"
          placeholder="Enter your item"
          onChange={e => keyInItemHandler(e, list.id)}
          onKeyDown={e => handleEnter(e, list.id)}
        />
        <Tooltip
          title="Add a parent item"
          aria-label="add-parent-item"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className="list-add-btn tooltip"
            onClick={e => addFirstItem(e, list.id)}
            data-testid="list-add-btn"
          >
            Add
          </button>
        </Tooltip>
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
