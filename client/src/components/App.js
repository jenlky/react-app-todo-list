import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Lists from "./List/Lists";
import Navbar from "./Navbar";
import Landing from "./Landing";
import SignUpOrLogin from "./SignupLogin/SignUpOrLogin";
import "../styles/App.css";
import { signUp, login, logout } from "../api/api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "",
      username: "",
      email: "",
      password: "",
      hasError: false
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

    try {
      let response;
      response = await signUp(name, username, email, password);
      console.log("signup response", response);

      if (response.data.jwt) {
        sessionStorage.setItem("jwt", response.data.jwt);
        this.setState(prev => {
          return {
            name: "",
            email: "",
            password: "",
            username: response.data.username,
            isLoggedIn: !prev.isLoggedIn,
            hasError: null
          };
        });
        history.push(`/users/${username}`);
      }
    } catch (error) {
      console.log("signup", error);
      this.setState({ error, hasError: true });
    }
  };

  login = async (e, history) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const response = await login(username, password);
      console.log("login response", response);

      if (response.data.jwt) {
        sessionStorage.setItem("jwt", response.data.jwt);
        this.setState({
          username: response.data.username,
          password: "",
          isLoggedIn: true,
          hasError: null
        });
        history.push(`/users/${username}`);
      }
    } catch (error) {
      console.log("login", error);
      this.setState({ error, hasError: true });
    }
  };

  logout = async (e, history) => {
    e.preventDefault();
    const response = await logout();
    console.log("logout response", response);

    sessionStorage.removeItem("jwt");
    this.setState({
      username: "",
      password: "",
      isLoggedIn: false
    });
    history.push("/");
  };

  resetNotificationState = () => {
    this.setState({ hasError: false });
  };

  render() {
    console.log(this.state);

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <>
                  <Navbar
                    {...props}
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                  />
                  <Landing />
                </>
              );
            }}
          />
          <Route
            path="/users"
            render={props => {
              return (
                <>
                  <Navbar
                    {...props}
                    username={this.state.username}
                    isLoggedIn={this.state.isLoggedIn}
                    logout={this.logout}
                  />
                  <div className="app-main-content">
                    <div className="app">
                      <Lists
                        username={this.state.username}
                        isLoggedIn={this.state.isLoggedIn}
                      />
                    </div>
                  </div>
                </>
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
                resetNotificationState={this.resetNotificationState}
                signup={this.signup}
                login={this.login}
                hasError={this.state.hasError}
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
                resetNotificationState={this.resetNotificationState}
                signup={this.signup}
                login={this.login}
                hasError={this.state.hasError}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
