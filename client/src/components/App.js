import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Lists from "./List/Lists";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import SignUpOrLogin from "./SignupLogin/SignUpOrLogin";
import "../styles/App.css";
import { signUp, login } from "../api/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "",
      username: "",
      email: "",
      password: ""
    };
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

  signup = async (e, history) => {
    e.preventDefault();

    const { name, username, email, password } = this.state;
    if (name && username && email && password) {
      let res;
      try {
        res = await signUp(`/signup`, {
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
    }
  };

  login = async (e, history) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (username && password) {
      const res = await login(`/login`, {
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

  render() {
    console.log(this.state);

    return (
      <Router>
        <Switch>
          <Route
            exact
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
            path="/users"
            render={() => {
              return (
                <React.Fragment>
                  <Navbar
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                  />
                  <div className="app">
                    <Lists
                      username={this.state.username}
                      isLoggedIn={this.state.isLoggedIn}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          />
          <Route
            exact
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
            exact
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
