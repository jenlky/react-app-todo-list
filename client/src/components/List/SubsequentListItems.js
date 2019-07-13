import React from "react";
import ListItem from "./ListItem";

const SubsequentListItems = ({ listItem, ...toggleDisplay }) => {
  return (
    <React.Fragment>
      <ul className="todo-child-list">
        {listItem.children.map((subsequentItem, index) => {
          return (
            <ListItem key={index} item={subsequentItem} {...toggleDisplay} />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default SubsequentListItems;
