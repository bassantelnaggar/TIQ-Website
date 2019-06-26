import React, { Component } from "react";
// import OurPeople from "../../pages/Homee/ourPeople/OurPeople";
import OurPeople from "../../pages/Homee/ourPeoplee/ourPeoplee";
import "./DeleteUser.css";
import ourPeopleBG from '../../pages/Homee/images/ourpeoplebg.png'

//import DetailedExpansionPanel from "./DetailedExpansionPanel";

export class DeleteUser extends Component {
  render() {
    console.log(this.props.users);
    const nada = this.props.users.map(user => {
      return (
        <div >
          <OurPeople
          id={user._id}
          user={user}
          deleteUser={this.props.deleteUser}
          update={this.props.update}
        />
        </div>
      );
    });
    return (
      <div>
        {/* <img src = {ourPeopleBG} style={{backgroundsize: 'cover', marginTop:"-5%"}}></img> */}
     
      <div class="row">{nada}</div> 
      </div>
      );
    }
  }
  
  export default DeleteUser;