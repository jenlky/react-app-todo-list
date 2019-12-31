import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export default function Username({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [password, setPassword] = useState("");
  useEffect(() => validate(password), [password]);

  const validate = password => {
    if (
      password.match(/^[a-zA-Z0-9]+$/) &&
      password.length >= 4 &&
      password.length <= 20
    ) {
      setError(false);
      setHelperText("");
    } else if (password === "") {
      setError(false);
      setHelperText("");
    } else {
      setError(true);
      setHelperText(
        "Password must be alphanumeric and between 8 to 20 characters"
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
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={e => {
          setPassword(e.target.value);
          return updateUserState(e);
        }}
      />
    </>
  );
}
