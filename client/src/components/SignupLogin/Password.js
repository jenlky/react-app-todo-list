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
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={updateUserState}
        onFocus={e => {
          setError(true);
          setHelperText(
            "Password must be alphanumeric and between 8 to 20 characters"
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
