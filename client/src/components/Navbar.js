import React from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100vw"
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
            Sign up
          </Button>
          <Button className={classes.button} color="inherit">
            Log in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
