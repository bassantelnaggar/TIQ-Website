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
    created:false,
    message:""
  };
getMessage=(m)=> {
//   console.log(m)
//  if(m==="Email already exists ,choose another mail..."){
//     this.setState({message:"Email already exists ,choose another mail..."})

//  }
//  if(m==="Email already exists ,choose another mail..."){
//   this.setState({message:"Email already exists ,choose another mail..."})

// }
//  else{
  // this.setState({message:"Please wait for the confirmation mail"})
  if(m===undefined)
    this.setState({message:"Please wait for the confirmation mail"})
  else
    this.setState({message:m})
  

//  }
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
    // console.log(din)
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
      .then(res => this.getMessage(res.data.error))

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
      .then(res => this.getMessage(res.data.error))

      
    }
    if(type=="parent"){
      // try{
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
    // }
    .then(res => this.getMessage(res.data.error))
    //  catch(err){
    //    alert(err);
    //  }
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
      
      .then(res => this.getMessage(res.data.error))

    }
    this.setState({created:true})
    //return <Alert/>
   // this.props.history.push("/TIQHome");
  };

  render() {
console.log(this.state.message)
    //  console.log(this.addUser);
  //  return  <alert/>
    return (
      <div>
    <SignUp p={this.SignUp} addUser={this.addUser} />
    
    {this.state.created && <Alert message={this.state.message}/>}
   {/* <Alert message="jkjkjkhhhhhhhhhhjhjjjjjjjjjjjjjjjjjjjjhhhhhhhhh"/> */}
    </div>
    );
  }
}

export default CreateUser;
