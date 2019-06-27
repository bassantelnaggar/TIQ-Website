import React, { Component } from 'react';
import SignedUps from './SignedUps';

import NavbarSignedIn from "../layout/NavbarSignedIn";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";

import axios from 'axios';
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class SignedUp extends Component {
  state={
      SignedUp:[]
  }
  
//   handleClick = event => {
//     let path = `/adminquestions`;
//     this.props.history.push(path);
   
//   };
  
  componentDidMount()  {
    axios.get('/api/SignedUp')
    .then(res => this.setState({ SignedUp: res.data.data }))
  }
  handleClickWWW =() => {
    this.props.history.push("/signin");
 };
  decline = (id) => {
    axios.delete('/api/SignedUp/'+id)
      .then(res => this.setState({ SignedUp: [...this.state.SignedUp.filter(signedUp => signedUp._id !== id)] }));
      alert("Declined successfully!")
}

  accept = (id) => {
    axios.post('/api/Users/register/'+id, {})
    .then(res => this.setState({ SignedUp: [...this.state.SignedUp.filter(signedUp => signedUp._id !== id)] }));
    alert("Accepted successfully!")
  }
  render() {
    //const { classes } = this.props;

    if (this.props.token == null) {
      return (
        <div>
        <Navbar/>
        <div>
        <div>

                <h1 style={{paddingRight:'500px',boxAlign:"inline",color:"#3e3939bf",fontSize:"5000px"}} >FAQs </h1>
                <br></br>
                <button
                  variant="contained"
                  onClick={() => {
                    this.handleClickWWW();
                  }}
                  className="btn"
                  style={{backgroundColor:"#70c7be"}}
                >
                  Sign In
                </button>
                </div>
          </div>
        </div>
      );
    }
    else{
      const auth = this.props.usertype === "TIQadmin";
    if (auth) {
    return (
     
        <div >
        <NavbarSignedIn />

          <div>
            <h1 style={{color:"#3e3939bf"}}> Signed Up People </h1>      
            <br></br>
            <SignedUps  SignedUp={this.state.SignedUp} decline={this.decline} accept={this.accept} />
             
          </div>  
        </div>
   
    );
    }
  }}
}
const edit={
  backgroundColor:'#5ec0b6' ,
  paddingBottom:'5px',
  marginLeft:"1000px"
  
}
const Form = connect(
  mapStateToProps,
  null
)((SignedUp));
export default Form;
