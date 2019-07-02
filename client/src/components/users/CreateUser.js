import React, { Component } from "react";
import axios from "axios";
import SignUp from "../../pages/signUp/SignUp";
import Alert from "../../pages/signUp/Alert";

export class CreateUser extends Component {
  state = {
    type: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    bio: "",
    email: "",
    password: "",
    house: "",
    din: "",
    dor: "",
    tiqStatus:"",
    supervisorType:"",
    created:false
  };

  addUser = (
    type,
    firstName,
    lastName,
    birthDate,
    bio,
    email,
    password,
    house,
    din,
    dor,
    tiqStatus,
    supervisorType

  ) => {
    console.log(firstName)
     console.log(lastName)
     console.log(type)
     console.log(email)
     console.log(din)
   if(type=="member"){
     

      axios.post("/api/SignedUp/signUp", {
        "type": type,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "bio": bio,
        "email": email,
        "password": password,
        house: house,
        din: din,
        tiqStatus:tiqStatus,
        supervisorType:supervisorType
      })
      
     
     
    }
    if(type=="alumni"){
      axios
      .post("/api/SignedUp/signUp", {
        type: type,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        bio: bio,
        email: email,
        password: password,
        house: house,
        din: din,
        dor:dor
       
      })
      
      
    }
    if(type=="parent"){
      axios
      .post("/api/SignedUp/signUp", {
        type: type,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        bio: bio,
        email: email,
        password: password,
       
       
      })
      
      
    }
    if(type=="disciple"){
      axios
      .post("/api/SignedUp/signUp", {
        type: type,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        bio: bio,
        email: email,
        password: password,
        house: house,
     
      })
      
      
    }
    this.setState({created:true})
    //return <Alert/>
   // this.props.history.push("/TIQHome");
  };

  render() {

    //  console.log(this.addUser);
  //  return  <alert/>
    return (
      <div>
    <SignUp p={this.SignUp} addUser={this.addUser} />
    {this.state.created && <Alert/>}
   {/* <Alert/> */}
    </div>
    );
  }
}

export default CreateUser;
