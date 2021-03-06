import React, { Component } from "react";
import List from "./List";
import AddNewList from "./AddNewList";
import "../../styles/List.css";
import {
  getAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  overwriteListItems
} from "../../api/api";

export default class Lists extends Component {
  constructor(props) {
    super(props);
    const lists = {
      id: 1,
      name: "Playground",
      listItems: [
        {
          id: "1",
          text: "Type whatever you want",
          children: [
            {
              id: "1-1",
              text: "Click on plus to add child item",
              children: [
                {
                  id: "1-1-1",
                  text: "Test nested items",
                  children: [
                    {
                      id: "1-1-1-1",
                      text: "1-1-1-1",
                      children: [],
                      display: false
                    }
                  ],
                  display: false
                }
              ],
              display: false
            }
          ],
          display: false
        },
        {
          id: "2",
          text: "Highlight to bold, italicise etc the text",
          children: [
            {
              id: "2-1",
              text: "2-1",
              children: [],
              display: false
            }
          ],
          display: false
        },
        {
          id: "3",
          text: "Click on right triangle to display child items",
          children: [],
          display: false
        },
        {
          id: "4",
          text: "Click on cross to remove list item",
          children: [],
          display: false
        }
      ]
    };

    this.state = {
      lists: this.props.isLoggedIn ? [] : [lists],
      keyInItem: "",
      delay: 150
    };
  }

  async componentDidMount() {
    const { isLoggedIn, username } = this.props;
    if (isLoggedIn) {
      try {
        const response = await getAllLists(username);
        console.log("componentDidMount getAllLists", response);
        this.setState({ lists: response.data });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // async componentDidUpdate() {
  //   const { isLoggedIn, username } = this.props;
  //   if (isLoggedIn) {
  //     try {
  //       const response = await getAllLists(username);
  //       console.log("componentDidUpdate getAllLists", response);

  //       if (response.data != this.state.lists) {
  //         this.setState({ lists: response.data });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }

  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  listNameHandler = async (e, id) => {
    const lists = [...this.state.lists];
    const address = this.findListIndex(id);
    lists[address].name = e.target.value;
    const updatedListName = {
      name: e.target.value
    };

    this.setState({
      lists
    });

    try {
      if (this.props.username) {
        const response = await updateOneList(
          this.props.username,
          address,
          updatedListName
        );
        console.log("updateOneList response", response);
      }
    } catch (err) {
      console.log(err);
    }
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
  addFirstItem = async (event, id) => {
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      const address = this.insertNewParentItem(id);
      event.currentTarget.previousSibling.value = "";

      if (this.props.username) {
        const updatedListItems = this.state.lists[address].listItems;
        console.log("addFirstItem updatedListItems", updatedListItems);

        const response = await overwriteListItems(
          this.props.username,
          address,
          updatedListItems
        );
        console.log("overwriteListItems response", response);
      }
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
    return address;
  };

  findListIndex = id => {
    const lists = [...this.state.lists];
    return lists.findIndex(list => {
      return list.id === Number(id);
    });
  };

  findFirstItemIndex = (listItems, id) => {
    // when remove - this func can't find firstItemIndex
    return listItems.findIndex(item => {
      return id === item.id;
    });
  };

  findSubsequentItemIndex = (parentItem, id, address) => {
    if (parentItem) {
      for (let x = 0; x < parentItem.children.length; x++) {
        const parentItemId = parentItem.children[x].id.split("-");

        // address.length + 1 because parentItem has already accessed parentIndex
        if (id === parentItemId[address.length + 1]) {
          address.push(x);
          return parentItem.children[x];
        }
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
    return { parentItem, childAddress, listAddress };
  };

  addSubsequentItem = async (listId, itemId) => {
    const parentItems = [...this.state.lists];
    const { parentItem, listAddress } = this.findItem(
      parentItems,
      listId,
      itemId,
      false
    );

    this.addItemToParent(parentItem);
    parentItem.display = true;
    this.setState({ lists: parentItems });

    if (this.props.username) {
      const updatedListItems = this.state.lists[listAddress].listItems;
      console.log("addSubsequentItem updatedListItems", updatedListItems);

      const response = await overwriteListItems(
        this.props.username,
        listAddress,
        updatedListItems
      );
      console.log("overwriteListItems response", response);
    }
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

  editItem = async (newValue, listId, itemId) => {
    console.log("editItem value", newValue);
    const lists = [...this.state.lists];
    const { parentItem, listAddress } = this.findItem(
      lists,
      listId,
      itemId,
      false
    );
    parentItem.text = newValue;
    this.setState({ lists });

    if (this.props.username) {
      const updatedListItems = this.state.lists[listAddress].listItems;
      console.log("editItem updatedListItems", updatedListItems);

      const response = await overwriteListItems(
        this.props.username,
        listAddress,
        updatedListItems
      );
      console.log("editItem overwriteListItems", response);
    }
  };

  removeItem = async (listId, itemId) => {
    const lists = [...this.state.lists];
    let listAddress;

    if (itemId === undefined) {
      listAddress = this.findListIndex(listId);
      lists.splice(listAddress, 1);

      if (this.props.username) {
        const response = await deleteOneList(this.props.username, listAddress);
        console.log("deleteOneList response", response);
      }
    } else if (itemId.length === 1) {
      listAddress = this.findListIndex(listId);
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

    if (this.state.lists[listAddress] && this.props.username) {
      const updatedListItems = this.state.lists[listAddress].listItems;
      console.log("removeItem updatedListItems", updatedListItems);

      const response = await overwriteListItems(
        this.props.username,
        listAddress,
        updatedListItems
      );
      console.log("overwriteListItems response", response);
    }
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

  addList = async () => {
    const lists = [...this.state.lists];
    let greatestId = 0;
    for (let x = 0; x < lists.length; x++) {
      if (lists[x].id > greatestId) {
        greatestId = lists[x].id;
      }
    }

    const newList = {
      id: greatestId + 1,
      name: "",
      listItems: []
    };
    lists.push(newList);
    this.setState({ lists });

    if (this.props.username) {
      const response = await createOneList(this.props.username);
      console.log("createOneList response", response);
    }
  };

  recursiveAll = (toDisplay, item) => {
    item.display = toDisplay;

    if (item.children.length === 0) {
      return;
    } else if (item.children.length > 0) {
      for (const child of item.children) {
        return this.recursiveAll(toDisplay, child);
      }
    }
  };

  expandOrCollapseAll = (toDisplay, id) => {
    const address = this.findListIndex(id);
    const lists = [...this.state.lists];

    for (const item of lists[address].listItems) {
      item.display = toDisplay;
      if ("children" in item && item.children.length > 0) {
        this.recursiveAll(toDisplay, item);
      }
    }

    this.setState({ lists });
  };

  render() {
    console.log(this.state);

    return (
      <>
        {this.state.lists.length > 0 &&
          this.state.lists.map(list => {
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
                expandOrCollapseAll={this.expandOrCollapseAll}
              />
            );
          })}
        <AddNewList addList={this.addList} />
      </>
    );
  }
}
