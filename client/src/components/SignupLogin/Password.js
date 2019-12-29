import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function Username({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  return (
    <ClickAwayListener
      onClickAway={e => {
        setError(false);
        setHelperText("");
      }}
    >
      <TextField
        error={error}
        helperText={helperText}
        className={textField}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={updateUserState}
        onClick={e => {
          setError(true);
          setHelperText(
            "Password must be alphanumberic and between 8 to 20 characters"
          );
        }}
      />
    </ClickAwayListener>
  );
}
