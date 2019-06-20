import React, { Component } from "react";
import SignedUpItem from "./SignedUpItem";

class SignedUps extends Component {
  render() {
    return this.props.SignedUp.map(signedUp => (
      <SignedUpItem
        key={signedUp._id}
        signedUp={signedUp}
        decline={this.props.decline}
        accept={this.props.accept}
      />
    ));
  }
}

export default SignedUps;
