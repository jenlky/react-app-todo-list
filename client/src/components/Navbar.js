import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../styles/App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import Username from "./Username";
import Logout from "./Logout";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100vw"
  },
  appbar: {
    backgroundColor: "#0067A3"
  },
  toolbar: {
    justifyContent: "flex-end"
  },
  button: {
    textTransform: "none",
    fontSize: "14px"
  }
}));

function Navbar({ username, isLoggedIn, logout }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          {isLoggedIn && username !== "" ? (
            <React.Fragment>
              <Username className={classes.button} username={username} />
              <Logout className={classes.button} logout={logout} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SignUp className={classes.button} />
              <Login className={classes.button} />
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
