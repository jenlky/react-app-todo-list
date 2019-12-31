import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../Notification";
import Username from "./Username";
import Password from "./Password";
import Email from "./Email";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  textField: {
    "& label": {
      fontSize: "1.1rem"
    },
    "& div": {
      fontSize: "1.4rem"
    },
    "& p": {
      fontSize: "1.12rem"
    }
  },
  submit: {
    margin: theme.spacing(2.5, 0, 1.84),
    fontSize: "1.1rem"
  }
}));

export default function SignUpForm({
  updateUserState,
  resetNotificationState,
  signup,
  hasError,
  history
}) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        onChange={updateUserState}
      />
      <Username
        textField={classes.textField}
        updateUserState={updateUserState}
      />
      <Email textField={classes.textField} updateUserState={updateUserState} />
      <Password
        textField={classes.textField}
        updateUserState={updateUserState}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={e => signup(e, history)}
      >
        Sign Up
      </Button>
      {/* <Grid container justify="flex-end">
        <Grid item>
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid> */}
      <Notification
        hasError={hasError}
        resetNotificationState={resetNotificationState}
        type="error"
        message="Sign up has failed. Please try again."
      />
    </form>
  );
}
