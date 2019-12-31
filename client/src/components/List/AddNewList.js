import React from "react";
import Button from "@material-ui/core/Button";

export default function AddNewList({ addList }) {
  return (
    <div>
      <Button variant="contained" color="inherit" onClick={addList}>
        Add another list
      </Button>
    </div>
  );
}
