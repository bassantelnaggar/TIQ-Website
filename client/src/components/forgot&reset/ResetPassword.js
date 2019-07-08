/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ResetPassword.css";
import Toolbar from "../../layout/Toolbar/Toolbar";

const loading = {
  margin: "1em",
  fontSize: "24px"
};

const title = {
  pageTitle: "Password Reset Screen"
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false,
      showNullError: false
    };
  }

  async componentDidMount() {
    console.log("doo doo doood : " + this.props.match.params.token);

    const response = await axios
      .get("/api/ForgotPassword/reset/" + this.props.match.params.token)
      .then(response => {
        console.log(response);

        if (response.data.message === "password reset link a-ok") {
          this.setState({
            email: response.data.email,
            updated: false,
            isLoading: false,
            error: false
          });
        }
      })
      .catch(error => {
        alert(error.response.data.errmsg || error.response.data);
        console.log(error.response.data.errmsg);
        this.setState({
          updated: false,
          isLoading: false,
          error: true
        });
      });
  }

  handleChange = name => event => {
    console.log("hannnnnnnnnnnnnnnnnnnnnnnnnnnndle");
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = async e => {
    e.preventDefault();
    // const { password, email } = this.state;
    // const {
    //   match: {
    //     params: { tokenn }
    //   }
    // } = this.props;

    console.log("heyyyyy");
    if (this.state.password === "") {
      this.setState({
        showNullError: true
      });
    } else {
      this.setState({
        showNullError: false
      });

      const response = await axios
        .put("/api/ForgotPassword/updatePasswordViaEmail", {
          email: this.state.email,
          password: this.state.password,
          resetPasswordToken: this.props.match.params.token
        })
        .then(response => {
          console.log("responseee dattttaaa : " + response.data);
          if (response.data.message === "password updated :)") {
            this.setState({
              updated: true,
              error: false
            });
          } else {
            this.setState({
              updated: false,
              error: true
            });
          }
        })
        .catch(err => alert(err.response.data.errmsg || err.response.data));
    }
  };

  render() {
    const { password, error, isLoading, updated, showNullError } = this.state;
    console.log(error);

    if (this.state.error) {
      return (
        <div>
          <div title={title} />
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <button TextField="Home" link="/" />
            <button
              style={{ color: "black" }}
              TextField="Forgot Password?"
              link="/ForgotPassword"
            />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div title={title} />
          <div>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        {/* <Toolbar />
        <div title={title} />
        <div className="password-form">
          <h1> New Password</h1>
          <input
            className="passwordTextField"
            placeholder="New Password"
            onChange={this.handleChange("password")}
            value={password}
            type="text"
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <button
            buttonText="updateButton"
            onClick={this.updatePassword}
            style={{ backgroundColor: "black" }}
          />
        </div> */}

        <Toolbar />
        <div title={title} />
        <div class="resetForm-container">
          <form class="resetForm">
            {/* <div class="border" /> */}
            <div class="resetForm-field">
              <h1 class="resetForm-header"> New Password</h1>
              <input
                className="passwordTextField"
                placeholder="New Password"
                onChange={this.handleChange("password")}
                value={password}
                type="text"
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <button
                buttonText="updateButton"
                onClick={this.updatePassword}
                style={{ backgroundColor: "black" }}
              />
            </div>
          </form>
        </div>

        {updated && (
          <div>
            <p style={{}}>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Link className="button" buttonText="Login" to="/signin" />
          </div>
        )}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};
