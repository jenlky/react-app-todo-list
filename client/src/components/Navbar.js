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
    justifyContent: "space-between"
  },
  button: {
    textTransform: "none",
    fontSize: "14px"
  }
}));

function Navbar({ username, isLoggedIn, logout, history }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <a
            className=""
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "24px"
            }}
            href="/"
          >
            StudyLah
          </a>
          {isLoggedIn && username !== "" ? (
            <div>
              <Username className={classes.button} username={username} />
              <LogoutBtn
                className={classes.button}
                logout={logout}
                history={history}
              />
            </div>
          ) : (
            <div>
              <SignUpBtn className={classes.button} />
              <LoginBtn className={classes.button} />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
