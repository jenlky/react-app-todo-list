import React from "react";
import Button from "@material-ui/core/Button";

function Logout({ className, logout }) {
  return (
    <Button onClick={logout} className={className} color="inherit">
      Log out
    </Button>
  );
}

export default Logout;
