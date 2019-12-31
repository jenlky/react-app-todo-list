import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

export default function Email({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  return (
    <>
      <TextField
        error={error}
        errorStyle={{ color: "green" }}
        helperText={helperText}
        className={textField}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={updateUserState}
        onFocus={e => {
          setError(true);
          setHelperText("Please enter a valid email address.");
        }}
        onBlur={e => {
          setError(false);
          setHelperText("");
        }}
      />
    </>
  );
}
