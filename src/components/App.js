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
    this.state = getData();
  }

  /* 
    onChange event handler: keyInItemHandler
    keyDown event handler: handleEnter
    onClick event handler: addParentItem
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
    const newObject = {
      id: this.state.items.length + 1,
      text: this.state.keyInItem
    };

    this.setState({
      items: [...this.state.items, newObject],
      keyInItem: ""
    });
  };

  /* 
    Return value contains the address of item: findIndexOfItem
    Traverse through array to find child item: getChildItem
    Find length of child item: findLength
    
    addChildItem, removeItem, editItem

  */
  // Return value contains the address of item and is stored in an array
  findIndexOfItem = id => {
    const items = this.state.items;

    for (let x = 0; x < items.length; x++) {
      if (id[0] === items[x].id) {
        return x;
      }
    }
  };

  // Traverse through the address array to get child item
  getChildItem = (parentItem, address) => {
    let currItem = null;

    for (let itemId of address) {
      currItem = parentItem.children[itemId];
    }

    return currItem;
  };

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
  addChildItem = (itemId, address) => {
    // console.log(itemId);

    if (itemId.length === 1) {
      address.push(this.findIndexOfItem(itemId[0]));
    } else {
      address.push(this.findIndexOfItem(itemId[0]));
      itemId.shift();
      this.addChildItem(itemId, address);
    }

    const items = [...this.state.items];
    // console.log(address);

    // Add grandchild to child item by pressing on plus icon
    if (address.length === 1) {
      this.addItemToParent(items[address[0]]);
    } else {
      const getChildItem = this.getChildItem(items[address[0]], address);
      this.addItemToParent(getChildItem);
    }

    this.setState({ items });
  };

  // Currently only remove parent item, does not remove child item
  // NEED to add remove child item logic
  // Angeline: why not use filter!!!
  removeItem = itemId => {
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

  // Edit item method for all list items (parent and child)
  editItem = (newValue, itemId, address) => {
    // console.log(itemId);

    if (itemId.length === 1) {
      address.push(this.findIndexOfItem(itemId[0]));
    } else {
      address.push(this.findIndexOfItem(itemId[0]));
      itemId.shift();
      this.editItem(newValue, itemId, address);
    }

    // when I destructure the inner references are all the same, only the outermost reference is different
    const items = [...this.state.items];

    if (address.length === 1) {
      items[address[0]].text = newValue;
    } else {
      const found = this.getChildItem(items[address[0]], address);
      found.text = newValue;
    }

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
          removeItem={this.removeItem}
          editItem={this.editItem}
        />
      </div>
    );
  }
}

export default App;
