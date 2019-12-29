import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function SignUpOrLogin({
  name,
  updateUserState,
  resetNotificationState,
  signup,
  login,
  hasError,
  history
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
        {name === "Sign up" ? (
          <SignUpForm
            updateUserState={updateUserState}
            resetNotificationState={resetNotificationState}
            signup={signup}
            history={history}
            hasError={hasError}
          />
        ) : (
          <LoginForm
            updateUserState={updateUserState}
            resetNotificationState={resetNotificationState}
            login={login}
            history={history}
            hasError={hasError}
          />
        )}
      </div>
    </Container>
  );
}
