import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export default function Username({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [username, setUsername] = useState("");
  useEffect(() => validate(username), [username]);

  const validate = username => {
    if (
      username.match(/^[a-zA-Z0-9]+$/) &&
      username.length >= 4 &&
      username.length <= 20
    ) {
      setError(false);
      setHelperText("");
    } else if (username === "") {
      setError(false);
      setHelperText("");
    } else {
      setError(true);
      setHelperText(
        "Username can contain a-z, 0-9 and only 4 to 20 characters."
      );
    }
  };

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
        onChange={e => {
          setUsername(e.target.value);
          return updateUserState(e);
        }}
      />
    </>
  );
}
