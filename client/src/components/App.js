import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./List/List";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import SignUpOrLogin from "./SignupLogin/SignUpOrLogin";
import getLists from "../service/lists-service";
import "../styles/App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: getLists(),
      keyInItem: "",
      isLoggedIn: false,
      name: "",
      username: "",
      email: "",
      password: "",
      delay: 150
    };
  }

  async componentDidMount() {}

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

  signup = async (e, history) => {
    e.preventDefault();
    const server = process.env.REACT_APP_URI || "http://localhost:3001";

    const { name, username, email, password } = this.state;
    if (name && username && email && password) {
      // doesn't distinguish what kind of error
      // whether user already exists in db, or form failed validation
      let res;
      try {
        res = await axios.post(`${server}/signup`, {
          name,
          username,
          email,
          password
        });
      } catch (error) {
        console.log(error);
      }

      console.log(res.data);
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

        history.push(`/users/${username}`);
      }

      // after this I'll need 1) React conditional rendering to guard the routes
      // 2) express middleware GET /secure
    }
  };

  // when I login or do CRUD then put the token in the request
  insertJWT = () => {
    const jwt = sessionStorage.getItem("jwt");
    return {
      authorization: "Bearer " + jwt
    };
  };

  login = async (e, history) => {
    e.preventDefault();
    const server = process.env.REACT_APP_URI || "http://localhost:3001";

    const { username, password } = this.state;
    if (username && password) {
      const res = await axios.post(`${server}/login`, {
        username,
        password
      });

      console.log(res.data);
      if (res.data.jwt) {
        sessionStorage.setItem("jwt", res.data.jwt);
        this.setState({
          username: res.data.username,
          password: "",
          isLoggedIn: true
        });

        history.push(`/users/${username}`);
      }
    }
  };

  logout = () => {};

  keyInItemHandler = event => {
    this.setState({
      keyInItem: event.target.value
    });
  };

  listNameHandler = event => {
    const lists = [...this.state.lists];
    lists[0].name = event.target.value;

    this.setState({
      lists
    });
  };

  // Pressing the enter key on input field triggers this method and adds item
  handleEnter = event => {
    const enterCondition = event.key === "Enter" && this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewParentItem();
      event.target.value = "";
    }
  };

  // Add item to parent list item by clicking on the 'Add button'
  addFirstItem = event => {
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewParentItem();
      event.currentTarget.previousSibling.value = "";
    }
  };

  // Helper function for handleEnter and addFirstItem
  insertNewParentItem = () => {
    const lists = [...this.state.lists];
    const id = this.findEmptyId();

    lists[0].listItems.push({
      id: String(id),
      text: this.state.keyInItem,
      children: [],
      display: false
    });

    this.setState({ keyInItem: "" });
  };

  // make this more generic
  findEmptyId = () => {
    const lists = [...this.state.lists];
    let id = 1;
    for (let item of lists[0].listItems) {
      if (id !== Number(item.id)) {
        break;
      }
      id++;
    }

    return id;
  };

  findFirstItemIndex = id => {
    const lists = [...this.state.lists];
    const parentItems = lists[0].listItems;

    for (let x = 0; x < parentItems.length; x++) {
      if (id === parentItems[x].id) {
        return x;
      }
    }
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

  findItem = (parentItems, itemId, findItsParent) => {
    const parentAddress = this.findFirstItemIndex(itemId[0]);
    let parentItem = parentItems[parentAddress];
    itemId.shift();
    const childAddress = [];

    while (findItsParent ? itemId.length > 1 : itemId.length > 0) {
      parentItem = this.findSubsequentItemIndex(
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
  addSubsequentItem = itemId => {
    const lists = [...this.state.lists];
    const parentItems = lists[0].listItems;

    const { parentItem } = this.findItem(parentItems, itemId, false);
    this.addItemToParent(parentItem);
    parentItem.display = true;

    setTimeout(() => {
      this.setState({ lists });
    }, this.state.delay);
  };

  // change the logic to fill up the gaps in id
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

  render() {
    console.log(this.state.lists[0]);

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
                  <Navbar
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                  />
                  <Homepage />
                </React.Fragment>
              );
            }}
          />
          <Route
            // exact={true}
            path="/users"
            // path={`/users/${this.state.username}`}
            render={() => {
              return (
                <React.Fragment>
                  <Navbar
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                  />
                  <div className="app">
                    <List
                      list={this.state.lists[0]}
                      name={this.state.lists[0].name}
                      listNameHandler={this.listNameHandler}
                      keyInItemHandler={this.keyInItemHandler}
                      addFirstItem={this.addFirstItem}
                      handleEnter={this.handleEnter}
                      addSubsequentItem={this.addSubsequentItem}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          />
          <Route
            exact={true}
            path="/signup"
            render={props => (
              <SignUpOrLogin
                {...props}
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
            render={props => (
              <SignUpOrLogin
                {...props}
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
