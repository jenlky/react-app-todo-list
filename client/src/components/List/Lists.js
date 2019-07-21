import React from "react";
import List from "./List";
import getLists from "../../service/lists-service";
import "../../styles/ToDoList.css";

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: getLists(),
      keyInItem: "",
      delay: 150
    };
  }

  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  listNameHandler = (e, id) => {
    const lists = [...this.state.lists];
    const address = this.findListIndex(lists, id);
    lists[address].name = e.target.value;

    this.setState({
      lists
    });
  };

  // Pressing the enter key on input field triggers this method and adds item
  handleEnter = (event, id) => {
    const enterCondition = event.key === "Enter" && this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewParentItem(id);
      event.target.value = "";
    }
  };

  // Add item to parent list item by clicking on the 'Add button'
  addFirstItem = (event, id) => {
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewParentItem(id);
      event.currentTarget.previousSibling.value = "";
    }
  };

  // Helper function for handleEnter and addFirstItem
  insertNewParentItem = listId => {
    const lists = [...this.state.lists];
    const address = this.findListIndex(listId);

    let itemId = 1;
    for (let item of lists[address].listItems) {
      if (itemId !== Number(item.id)) {
        break;
      }
      itemId++;
    }

    lists[address].listItems.push({
      id: String(itemId),
      text: this.state.keyInItem,
      children: [],
      display: false
    });
    this.setState({ keyInItem: "" });
  };

  findListIndex = id => {
    const lists = [...this.state.lists];
    return lists.findIndex(list => {
      return Number(id) === list.id;
    });
  };

  findFirstItemIndex = (listItems, id) => {
    return listItems.findIndex(item => {
      return id === item.id;
    });
  };

  findSubsequentItemIndex = (parentItem, id, address) => {
    for (let x = 0; x < parentItem.children.length; x++) {
      const parentItemId = parentItem.children[x].id.split("-");

      // address.length + 1 because parentItem has already accessed parentIndex
      if (id === parentItemId[address.length + 1]) {
        address.push(x);
        return parentItem.children[x];
      }
    }
  };

  findItem = (lists, listId, itemId, findItsParent) => {
    const listAddress = this.findListIndex(listId);
    const listItems = lists[listAddress].listItems;

    const firstItemAddress = this.findFirstItemIndex(listItems, itemId[0]);
    itemId.shift();
    let parentItem = listItems[firstItemAddress];
    const childAddress = [];

    while (findItsParent ? itemId.length > 1 : itemId.length > 0) {
      parentItem = this.findSubsequentItemIndex(
        parentItem,
        itemId[0],
        childAddress
      );

      itemId.shift();
    }
    return { parentItem, childAddress };
  };

  addSubsequentItem = (listId, itemId) => {
    // console.log("addSubsequentItem listId and itemId:", listId + ", " + itemId);

    const parentItems = [...this.state.lists];
    const { parentItem } = this.findItem(parentItems, listId, itemId, false);
    // console.log("addSubsequentItem parentItem", parentItem);

    this.addItemToParent(parentItem);
    parentItem.display = true;

    setTimeout(() => {
      this.setState({ lists: parentItems });
    }, this.state.delay);
  };

  addItemToParent = parentItem => {
    const numOfChildren = parentItem.children.length;
    let combinedId;
    let newObj;

    if (numOfChildren > 0) {
      let id;
      let currentLastNum = 1;
      let nextLastNum;

      for (let x = 0; x < parentItem.children.length; x++) {
        id = parentItem.children[x].id.split("-");
        nextLastNum = Number(id[id.length - 1]);

        if (currentLastNum !== nextLastNum) {
          break;
        }
        currentLastNum++;
      }

      id.pop();
      id.push(currentLastNum);
      combinedId = id.join("-");
    } else {
      combinedId = parentItem.id + "-1";
    }

    newObj = { id: combinedId, text: "", children: [] };
    parentItem.children.push(newObj);
  };

  editItem = (newValue, listId, itemId) => {
    const lists = [...this.state.lists];
    const { parentItem } = this.findItem(lists, listId, itemId, false);
    parentItem.text = newValue;
    this.setState({ lists });
  };

  removeItem = (listId, itemId) => {
    const lists = [...this.state.lists];

    if (itemId === undefined) {
      const listAddress = lists.findIndex(list => {
        return list.id === listId;
      });

      lists.splice(listAddress, 1);
    } else if (itemId.length === 1) {
      const listAddress = this.findListIndex(listId);
      const listItems = lists[listAddress].listItems;
      const childIndex = listItems.findIndex(item => {
        return item.id === itemId[0];
      });
      listItems.splice(childIndex, 1);
    } else {
      const { parentItem } = this.findItem(lists, listId, itemId, true);
      const childAddress = [];
      this.findSubsequentItemIndex(
        parentItem,
        itemId[itemId.length - 1],
        childAddress
      );

      const childIndex = childAddress[0];
      parentItem.children.splice(childIndex, 1);
    }

    this.setState({
      lists
    });
  };

  toggleDisplay = (listId, itemId) => {
    const lists = [...this.state.lists];

    setTimeout(() => {
      this.setState(prev => {
        const { parentItem } = this.findItem(prev.lists, listId, itemId, false);
        parentItem.display = !parentItem.display;

        return {
          lists
        };
      });
    }, this.state.delay);
  };

  render() {
    console.log(this.state.lists);

    return (
      <React.Fragment>
        {this.state.lists.map(list => {
          return (
            <List
              key={list.id}
              list={list}
              listNameHandler={this.listNameHandler}
              keyInItemHandler={this.keyInItemHandler}
              addFirstItem={this.addFirstItem}
              handleEnter={this.handleEnter}
              addSubsequentItem={this.addSubsequentItem}
              editItem={this.editItem}
              removeItem={this.removeItem}
              toggleDisplay={this.toggleDisplay}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Lists;
