import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../styles/App.css";
import SignUpBtn from "./SignupLogin/SignUpBtn";
import LoginBtn from "./SignupLogin/LoginBtn";
import Username from "./SignupLogin/Username";
import LogoutBtn from "./SignupLogin/LogoutBtn";

const useStyles = makeStyles(() => ({
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
              <LogoutBtn className={classes.button} logout={logout} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SignUpBtn className={classes.button} />
              <LoginBtn className={classes.button} />
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
