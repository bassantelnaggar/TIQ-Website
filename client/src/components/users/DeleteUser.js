import React, { Component } from "react";
// import OurPeople from "../../pages/Homee/ourPeople/OurPeople";
import OurPeople from "../../pages/Homee/ourPeoplee/ourPeoplee";
import "./DeleteUser.css";

//import DetailedExpansionPanel from "./DetailedExpansionPanel";

export class DeleteUser extends Component {
  render() {
    console.log(this.props.users);
    const nada = this.props.users.map(user => {
      return (
        <div>
          <OurPeople
            key={user._id}
            id={user._id}
            user={user}
            deleteUser={this.props.deleteUser}
          />
        </div>
      );
    });

    return <div class="row">{nada}</div>;
  }
}

export default DeleteUser;
