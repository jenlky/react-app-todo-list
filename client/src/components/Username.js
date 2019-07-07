import React from "react";
import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
import "../styles/App.css";

function Username({ className, username }) {
  return (
    <Button className={className} color="inherit">
      {/* <Link to="/" className="navbar-link"> */}
      {username}
      {/* </Link> */}
    </Button>
  );
}

export default Username;
