import React from "react";
import Input from "./Input";
import Button from "./Button";
import ToDoParentList from "./ToDoParentList";
import getData from "../service/items-service";
import "../styles/App.css";

// Responsive(Bonus): No

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getData(),
      keyInItem: ""
      // title: "My To-Do List"
    };
  }

  /* 
    onChange event handler: keyInItemHandler
    keyDown event handler: handleEnter
    onClick event handler: addParentItem, removeItem (to be changed to removeParentItem)
    helper function for handleEnter and addParentItem: insertNewItem

    onChange, keyDown and onClick event handler for adding parent item

  */
  // Handle onChange event on input field
  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  // Pressing the enter key on input field triggers this method and adds item
  handleEnter = event => {
    const enterCondition = event.key === "Enter" && this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewItem();
      // set input value empty string
      event.target.value = "";
    }
  };

  // Add item to parent list item by clicking on the 'Add button'
  addParentItem = event => {
    // console.log(event.currentTarget);
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewItem();
      // set input value empty string
      event.currentTarget.previousSibling.value = "";
    }
  };

  // Helper function for handleEnter and addParentItem
  insertNewItem = () => {
    this.setState(prev => {
      return {
        items: [
          ...this.state.items,
          {
            id: (prev.items.length + 1).toString(),
            text: prev.keyInItem,
            children: []
          }
        ],
        keyInItem: ""
      };
    });
  };

  // Angeline asked why not use filter!!!
  removeParentItem = itemId => {
    const { items } = this.state;

    for (let x = 0; x < items.length; x++) {
      if (itemId === items[x].id) {
        const duplicateItems = [...items];
        duplicateItems.splice(x, 1);

        this.setState({
          items: duplicateItems
        });
      }
    }
  };

  /* 
    Return value contains the address of item: findIndexOfItem
    Traverse through array to find child item: getChildItem
    Find length of child item: findLength
    
    addChildItem, removeItem, editItem

  */

  /* 
    For example, itemId is ['1', '2']

    Separate accessing parent object from accessing children object. 
    1. findFirstIndexOfItem: compare firstId === items[x].id, if same return x.
    2. Use items[x] to access first parent object. 
    3. findSubsequentIndexOfItem: use parent object to find child indexes, 
        by looping through .children[] to find child item and store it in address array.
    4. Access child item with getChildItem using the address
    5. Do things to it
    
    Method for splitting index
    
  */

  // Generate an object with the latest id and push it to parentItem.children
  addItemToParent = parentItem => {
    const numOfChildren = parentItem.children.length;
    // console.log(numOfChildren);

    let newestId;
    let combinedId;
    let newObj;

    if (numOfChildren > 0) {
      newestId = parentItem.children[numOfChildren - 1].id;

      const itemId = newestId.split("-");
      const lastNum = itemId[itemId.length - 1];

      const newId = Number(lastNum) + 1;

      itemId[itemId.length - 1] = "" + newId;
      combinedId = itemId.join("-");
    } else {
      newestId = parentItem.id;
      combinedId = newestId + "-1";
    }

    newObj = { id: combinedId, text: "", children: [] };
    parentItem.children.push(newObj);
  };

  // Create a ToDoItem and push it in the children array

  /* 
    When I click on a parent item, I will first check if it has any child item.
    If it doesn't have - create an object, extend the id by '-1' and push it to the parentItem.children.
    If it has - find the last element, split the id, 
      convert the last element to number and increment it, convert it back to string, 
      create an object, use the string as id and push it to the parentItem.children.

  */

  addChildItem = itemId => {
    const items = [...this.state.items];

    const parentAddress = this.findFirstIndexOfItem(itemId[0]);
    let parentItem = items[parentAddress];
    itemId.shift();

    const childAddress = [];

    while (itemId.length > 0) {
      parentItem = this.findSubsequentIndexOfItem(
        parentItem,
        itemId[0],
        childAddress
      );
      itemId.shift();
    }

    // console.log("childAddress:", childAddress);

    this.addItemToParent(parentItem);
    this.setState({ items });
  };

  // Add remove child item logic
  removeChildItem = () => {};

  findFirstIndexOfItem = id => {
    const parentItem = [...this.state.items];

    for (let x = 0; x < parentItem.length; x++) {
      if (id === parentItem[x].id) {
        return x;
      }
    }
  };

  findSubsequentIndexOfItem = (parentItem, id, address) => {
    for (let x = 0; x < parentItem.children.length; x++) {
      const parentItemId = parentItem.children[x].id.split("-");

      // address.length + 1 because parentItem has already accessed parentIndex
      if (id === parentItemId[address.length + 1]) {
        address.push(x);
        return parentItem.children[x];
      }
    }
  };

  // Edit item method for all list items (parent and child)
  editItem = (newValue, itemId) => {
    const items = [...this.state.items];

    const parentAddress = this.findFirstIndexOfItem(itemId[0]);
    let parentItem = items[parentAddress];
    itemId.shift();

    console.log("childId", itemId);

    const childAddress = [];

    while (itemId.length > 0) {
      parentItem = this.findSubsequentIndexOfItem(
        parentItem,
        itemId[0],
        childAddress
      );
      itemId.shift();
    }

    console.log("childAddress:", childAddress);
    parentItem.text = newValue;

    // after I destructure and edit, I setState to trigger a reset
    this.setState({ items });
  };

  render() {
    console.log(this.state.items);

    return (
      <div className="todo">
        <h1>My To-Do List</h1>
        <div className="todo-inputAndBtn">
          <Input
            keyInItemHandler={this.keyInItemHandler}
            handleEnter={this.handleEnter}
          />
          <Button addParentItem={this.addParentItem} />
        </div>
        <ToDoParentList
          items={this.state.items}
          addChildItem={this.addChildItem}
          removeParentItem={this.removeParentItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
}

export default App;
