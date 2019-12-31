import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export default function EmailAddress({ updateUserState, textField }) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [email, setEmail] = useState("");
  useEffect(() => validate(email), [email]);

  const validate = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regex)) {
      setError(false);
      setHelperText("");
    } else if (email === "") {
      setError(false);
      setHelperText("");
    } else {
      setError(true);
      setHelperText("Please enter a valid email address.");
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
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={e => {
          setEmail(e.target.value);
          return updateUserState(e);
        }}
      />
    </>
  );
}
