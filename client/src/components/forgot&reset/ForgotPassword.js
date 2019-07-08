import React, { Component } from "react";

import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Toolbar from "../../layout/Toolbar/Toolbar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const title = {
  pageTitle: "Forgot Password Screen"
};
const useStyles = theme => ({
  root: {
    height: "100vh"
  },

  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {},
  form: {
    width: "100%" // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {}
});
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      isLoading: false,
      working: true
    };
  }

  onChange = () => event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendEmail() {
    if (this.state.email === "") {
      this.setState({
        showError: false,
        messageFromServer: ""
      });
      alert("Please add your mail");
    } else {
      {
        alert(
          "Please wait in the current page until you get a confirmation message that your mail has been sent successfully."
        );
      }
      axios
        .post("/api/ForgotPassword/forgotPassword", {
          email: this.state.email
        })
        .then(response => {
          if (response.data.data === "This email is not in DB") {
            this.setState({
              showError: true,
              messageFromServer: ""
            });
            alert("You're not registered love.");
          } else if (response.data === "recovery email sent") {
            this.setState({
              showError: false,
              messageFromServer: "recovery email sent",
              isLoading: true
            });
          }
          window.location.href = "/CheckMail";
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }
  render() {
    const {
      email,
      messageFromServer,
      showError,
      isLoading,
      working
    } = this.state;
    const classes = useStyles();
    console.log("6666");

    return (
      <div>
        <Toolbar />
        <div
          className={classes.root}
          style={{
            postion: "fixed",
            marginLeft: "31%",
            marginTop: "15%",
            width: "100%",
            lineHeight: "1"
          }}
        >
          <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={5}>
              <div className={classes.paper}>
                <form className={classes.form} noValidate>
                  <InputLabel htmlFor="email">Enter Your Email </InputLabel>
                  <Input
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.onChange()}
                    placeholder="Email Address"
                  />
                  <br />
                  <br />

                  <Button
                    style={{ background: "#410c12" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.sendEmail();
                    }}
                  >
                    Reset
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
          {showError && (
            <div>
              <p>
                That email address isn&apos;t recognized. Please try again or
                register for a new account.
              </p>
              <Link to="/createuser" />
            </div>
          )}
          {messageFromServer === "recovery email sent" && (
            <div>
              <div>
                <h3>Password Reset Email Successfully Sent!</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
