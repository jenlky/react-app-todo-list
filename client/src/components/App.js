import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./List";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import SignUpOrLogin from "./SignUpOrLogin";
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
    console.log(history);

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
      event.target.value = "";
    }
  };

  // Add item to parent list item by clicking on the 'Add button'
  addParentItem = event => {
    const enterCondition = this.state.keyInItem !== "";

    if (enterCondition) {
      this.insertNewItem();
      event.currentTarget.previousSibling.value = "";
    }
  };

  // Helper function for handleEnter and addParentItem
  insertNewItem = () => {
    this.setState(prev => {
      return {
        lists: [
          ...this.state.lists,
          {
            text: prev.keyInItem,
            children: []
          }
        ],
        keyInItem: ""
      };
    });
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
                      titleHandler={this.titleHandler}
                      title={this.state.title}
                      keyInItemHandler={this.keyInItemHandler}
                      handleEnter={this.handleEnter}
                      lists={this.state.lists[0]}
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
