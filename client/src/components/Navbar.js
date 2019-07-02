import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/App.css";

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

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Button className={classes.button} color="inherit">
            <Link to="/signup" className="navbar-link">
              Sign up
            </Link>
          </Button>
          <Button className={classes.button} color="inherit">
            <Link to="/login" className="navbar-link">
              Log in
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
