import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./List";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import SignUpOrLogin from "./SignUpOrLogin";
import getData from "../service/items-service";
import "../styles/App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: "",
      items: getData(),
      keyInItem: "",
      title: "My To-Do List",
      loggedInUser: "",
      isLoggedIn: false,
      name: "",
      username: "",
      email: "",
      password: "",
      delay: 150
    };
  }

  async componentDidMount() {
    // try {
    //   axios.get("http://localhost:3001/").then(res => console.log(res.data));
    // } catch (err) {
    //   console.log(err);
    // }
  }

  updateUserState = e => {
    switch (e.target.id) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "username":
        this.setState({ username: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        console.log("No user state was updated");
    }
  };

  signup = async e => {
    e.preventDefault();
    const server = "http://localhost:3001";
    const { name, username, email, password } = this.state;

    if (name && username && email && password) {
      // doesn't distinguish what kind of error
      // whether user already exists in db, or form failed validation
      const res = await axios
        .post(`${server}/signup`, {
          name,
          username,
          email,
          password
        })
        .catch(err => console.log(err.message));

      if (res.data.jwt) {
        sessionStorage.setItem("jwt", res.data.jwt);
        this.setState(prev => {
          return {
            name: "",
            email: "",
            password: "",
            username: res.data.username,
            isLoggedIn: !prev.isLoggedIn
          };
        });
      }
      // after this I'll need 1) React conditional rendering to guard the routes
      // 2) express middleware GET /secure
    }
  };

  // when I login or do CRUD then put the token in the request
  insertJWT = () => {
    const jwt = sessionStorage.getItem("jwt");
    const headers = {
      authorization: "Bearer " + jwt
    };

    return headers;
  };

  login = async e => {
    e.preventDefault();
    const server = "http://localhost:3001";
    let res;

    const { username, password } = this.state;
    if (username && password) {
      res = await axios.post(`${server}/login`, {
        username,
        password
      });
      sessionStorage.setItem("jwt", res.data.jwt);
    }

    if (res.data.jwt) {
      this.setState({
        username: res.data.username,
        password: "",
        isLoggedIn: true
      });
    }
  };

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

  titleHandler = event => {
    this.setState({
      title: event.target.value
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

  /*
    Return value contains the address of item: findFirstIndexOfItem, findSubsequentIndexOfItem
    Traverse through array to find parent/child item: findItem
    Helper function for addChildItem: addItemToParent

    addChildItem, removeItem, editItem, toggleDisplay

  */

  // Find parent index of item
  findFirstIndexOfItem = id => {
    const parentItem = [...this.state.items];

    for (let x = 0; x < parentItem.length; x++) {
      if (id === parentItem[x].id) {
        return x;
      }
    }
  };

  // Find children index/indexes of item
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

  // Find parent item with the help of findFirstIndexOfItem() and findSubsequentIndexOfItem()
  findItem = (items, itemId, findItsParent) => {
    const parentAddress = this.findFirstIndexOfItem(itemId[0]);
    let parentItem = items[parentAddress];
    itemId.shift();

    const childAddress = [];
    // console.log("childAddress:", childAddress);

    while (findItsParent ? itemId.length > 1 : itemId.length > 0) {
      parentItem = this.findSubsequentIndexOfItem(
        parentItem,
        itemId[0],
        childAddress
      );

      itemId.shift();
    }

    console.log("findItem:", { parentItem, childAddress });

    return { parentItem, childAddress };
  };

  // Add child item to parent item and display its child items
  addChildItem = itemId => {
    const items = [...this.state.items];
    const { parentItem } = this.findItem(items, itemId, false);

    this.addItemToParent(parentItem);
    parentItem.display = true;

    setTimeout(() => {
      this.setState({ items });
    }, this.state.delay);
  };

  // Toggle display of parentItem using prevState
  toggleDisplay = itemId => {
    const items = [...this.state.items];

    setTimeout(() => {
      this.setState(prev => {
        const { parentItem } = this.findItem(prev.items, itemId, false);
        parentItem.display = !parentItem.display;

        return {
          items
        };
      });
    }, this.state.delay);
  };

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

  // Remove both parent and children, or only child item
  removeItem = itemId => {
    const items = [...this.state.items];
    console.log("removeItem", itemId);

    if (itemId.length === 1) {
      for (let x = 0; x < items.length; x++) {
        if (itemId[0] === items[x].id) {
          items.splice(x, 1);
        }
      }
    } else {
      // Find clicked item's parent
      const { parentItem } = this.findItem(items, itemId, true);
      const childAddress = [];

      // childAddress is pushed the child index in findSubsequentIndexOfItem
      this.findSubsequentIndexOfItem(
        parentItem,
        itemId[itemId.length - 1],
        childAddress
      );

      const childIndex = childAddress[0];
      parentItem.children.splice(childIndex, 1);
    }

    this.setState({
      items
    });
  };

  // Edit item method for all list items (parent and child)
  editItem = (newValue, itemId) => {
    const items = [...this.state.items];
    const { parentItem } = this.findItem(items, itemId, false);

    parentItem.text = newValue;
    this.setState({ items });
  };

  render() {
    console.log(this.state);

    return (
      <Router>
        <Switch>
          {/* if user isLoggedIn he can access List */}
          {/* guard the route for both frontend and backend */}
          <Route
            exact={true}
            path="/"
            render={() => {
              return (
                <React.Fragment>
                  <Navbar />
                  <Homepage />
                </React.Fragment>
              );
            }}
          />
          <Route
            // exact={true}
            path="/users"
            // path={`/users/${this.state.username}`}
            render={props => {
              return (
                <React.Fragment>
                  <Navbar />
                  <div className="app">
                    <List
                      titleHandler={this.titleHandler}
                      title={this.state.title}
                      keyInItemHandler={this.keyInItemHandler}
                      handleEnter={this.handleEnter}
                      addParentItem={this.addParentItem}
                      items={this.state.items}
                      addChildItem={this.addChildItem}
                      removeItem={this.removeItem}
                      editItem={this.editItem}
                      toggleDisplay={this.toggleDisplay}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          />
          <Route
            exact={true}
            path="/signup"
            render={() => (
              <SignUpOrLogin
                name="Sign up"
                updateUserState={this.updateUserState}
                signup={this.signup}
                login={this.login}
              />
            )}
          />
          <Route
            exact={true}
            path="/login"
            render={() => (
              <SignUpOrLogin
                name="Log in"
                updateUserState={this.updateUserState}
                signup={this.signup}
                login={this.login}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
