import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function SignUp({ className }) {
  return (
    <Button className={className} color="inherit">
      <Link to="/signup" className="navbar-link">
        Sign up
      </Link>
    </Button>
  );
}

export default SignUp;
