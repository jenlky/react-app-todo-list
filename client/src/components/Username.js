import React from "react";
import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";

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
