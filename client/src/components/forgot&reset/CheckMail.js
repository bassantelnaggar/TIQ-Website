import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Toolbar from "../../layout/Toolbar/Toolbar";

class CheckMail extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Toolbar />
        <h1
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "50px"
          }}
        >
          Check your email
        </h1>
        <p style={{ color: "black", textAlign: "center" }}>
          We've sent you an email. Click on the link in the email to reset your
          Password.
          <br /> If you didn't recevie email please click the link below to
          reset your Password again.
        </p>
        <Link
          to="/ForgotPassword"
          style={{ color: "#166199", fontWeight: "bold", textAlign: "center" }}
        >
          i didn't receive an email
        </Link>
      </div>
    );
  }
}
export default CheckMail;
