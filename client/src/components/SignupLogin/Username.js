import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function Username({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  return (
    <>
      <TextField
        error={error}
        helperText={helperText}
        className={textField}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="current-username"
        autoFocus
        onChange={updateUserState}
        onFocus={e => {
          console.log(e.target.value);
          setError(true);
          setHelperText(
            "Username must be alphanumeric and between 4 to 20 characters"
          );
        }}
        onBlur={e => {
          setError(false);
          setHelperText("");
        }}
      />
    </>
  );
}
