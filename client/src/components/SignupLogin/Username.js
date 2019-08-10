import React from "react";
import Button from "@material-ui/core/Button";

function Username({ className, username }) {
  return (
    <Button className={className} color="inherit">
      {username}
    </Button>
  );
}

export default Username;
