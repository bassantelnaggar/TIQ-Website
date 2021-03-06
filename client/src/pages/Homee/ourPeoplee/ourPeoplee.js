import React, { Component } from "react";
// import "./ourPeople.css";
import FormDialog from "../../../components/users/FormDialog";
import pic5 from "../images/pic5.jpeg";
import orion from "../../Homee/images/orion-logo.jpg";
import pegasus from "../../Homee/images/PEGASUS-LOGO.jpg";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import "./ourPeoplee.css";

import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
class ourPeople extends Component {
  render() {
    console.log(this.props);
    if (this.props.usertype === "TIQadmin") {
      if (this.props.user.house == "Orion") {
        return (
          <div class="maincontainer">
        
           {/* <div class="row"> */}
            <div class="thecard">
              <div class="thefront">
                
                <div class="profile-img-front">
                  <img src={this.props.user.profilePicture} />
                </div>

                <h class="h1">{this.props.user.firstName}</h>

                <h class="h1">{this.props.user.lastName}</h>

                <p class="p1">{this.props.user.type}</p>
              </div>

              <div class="theback">
                <div class="content-back">

                  {this.props.user.birthDate}
                  <br />

                  {this.props.user.email}
                  <br />
                  {this.props.user.bio}
                  <br />
                {this.props.user.type=="member" &&  <div>
                {this.props.user.house}
                <br />
                {this.props.user.din}
                <br />

                {this.props.user.tiqStatus}
                <br />

                {this.props.user.supervisorType}
      
                  </div>}
                 
                  {this.props.user.type=="alumni" &&  <div>
                {this.props.user.house}
                <br />
                {this.props.user.din}
                <br />

                {this.props.user.dor}
                
      
                  </div>}
                  {this.props.user.type=="disciple" &&  <div>
                {this.props.user.house}
               
                  </div>}
                  
                </div>

                <div className="btns">
                  <DeleteIcon
                    onClick={() => this.props.deleteUser(this.props.user._id)}
                  >
                    Delete
                  </DeleteIcon>
                  <br />

                  <FormDialog
                    user={this.props.user}
                    update={this.props.update}
                  />
                  <br />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          
          <div class="maincontainer">
           {/* <div class = "row"> */}
            <div class="thecard">
              <div class="thefront">
                {/* <div class="background-pegasus-img ">
                  <img src={pegasus} />
                </div> */}
                <div class="profile-img-front">
                  <img src={this.props.user.profilePicture} />
                </div>
                <h class="h1">{this.props.user.firstName}</h>
                <h class="h1">{this.props.user.lastName}</h>

                <p class="p1">{this.props.user.type}</p>
              </div>

              <div class="theback">
                <div class="content-back">
                  
                {this.props.user.birthDate}
                  <br />

                  {this.props.user.email}
                  <br />
                  {this.props.user.bio !=="" && <div>
                    {this.props.user.bio}
                  <br />
                  </div>}
                  {this.props.user.house !=="" && <div>
                    {this.props.user.house}
                  <br />
                  </div>}
                  {this.props.user.din !=="" && <div>
                    {this.props.user.din}
                  <br />
                  </div>}
                  {this.props.user.dor !=="" && <div>
                    {this.props.user.dor}
                  <br />
                  </div>}
                  {this.props.user.tiqStatus !=="" && <div>
                    {this.props.user.tiqStatus}
                  <br />
                  </div>}
                  {this.props.user.supervisorType !=="" && <div>
                    {this.props.user.supervisorType}
                  <br />
                  </div>}
                 
                  
                
                  
                </div>
                <div className="btns">
                  <DeleteIcon
                    onClick={() => this.props.deleteUser(this.props.user._id)}
                  >
                    Delete
                  </DeleteIcon>
                  <br />

                  <FormDialog
                    variant="outlined"
                    user={this.props.user}
                    update={this.props.update}
                  />
                  <br />
                </div>
              </div>
            </div>
            
           
           </div>
           
        );
      }
    } else {
      return ( <div class="maincontainer">
      {/* <div class = "row"> */}
       <div class="thecard">
         <div class="thefront">
           {/* <div class="background-pegasus-img ">
             <img src={pegasus} />
           </div> */}
           <div class="profile-img-front">
             <img src={this.props.user.profilePicture} />
           </div>
           <h class="h1">{this.props.user.firstName}</h>
           <h class="h1">{this.props.user.lastName}</h>

           <p class="p1">{this.props.user.type}</p>
         </div>

         <div class="theback">
           <div class="content-back">
             {this.props.user.birthDate}
             <br />

             {this.props.user.email}
             <br />

             {this.props.user.clubs}
             <br />
             {this.props.user.house}
             <br />
             {this.props.user.bio}
             <br />
             {this.props.user.din}
             <br />
             {this.props.user.dor}
           </div>
         </div>
       </div>
      
      </div>
       
      );
    }
  }
}

const Form = connect(
  mapStateToProps,
  null
)(ourPeople);

export default Form;