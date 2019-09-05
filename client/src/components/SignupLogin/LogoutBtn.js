import React from "react";
import Button from "@material-ui/core/Button";

function LogoutBtn({ className, logout, history }) {
  return (
    <Button
      onClick={e => logout(e, history)}
      className={className}
      color="inherit"
    >
      Log out
    </Button>
  );
}

export default LogoutBtn;
