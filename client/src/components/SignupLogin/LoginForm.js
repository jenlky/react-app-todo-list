import React from "react";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../Notification";
import Username from "./Username";
import Password from "./Password";

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

export default function LoginForm({
  updateUserState,
  resetNotificationState,
  login,
  hasError,
  history
}) {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      <Username
        textField={classes.textField}
        updateUserState={updateUserState}
      />
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
        onClick={e => login(e, history)}
      >
        Log In
      </Button>
      {/* <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
      <Notification
        hasError={hasError}
        resetNotificationState={resetNotificationState}
        type="error"
        message="Incorrect username or password."
      />
    </form>
  );
}
