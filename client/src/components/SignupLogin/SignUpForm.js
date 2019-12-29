import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../Notification";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  textField: {
    "& label": {
      fontSize: "1.1rem"
    }
  },
  submit: {
    margin: theme.spacing(2.5, 0, 1.84),
    fontSize: "1.1rem"
  }
}));

export default function SignUpForm({
  updateUserState,
  signup,
  hasError,
  history
}) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={updateUserState}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={updateUserState}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={updateUserState}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updateUserState}
          />
        </Grid>
      </Grid>
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
        type="error"
        message="Incorrect username or password."
      />
    </form>
  );
}
