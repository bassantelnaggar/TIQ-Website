import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from "axios"
import "./profile.css"
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import PegasusLogo from "../../components/images/tiqLogo1.png"
import OrionLogo from "../../Images/rsz_1rsz_orion-logo.jpg"
import PegasusLogo3 from "../../Images/PEGASUS-LOGO.jpeg"
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const mapStateToProps = state => {
    return { token: state.token, usertype: state.usertype, id: state.id };
  };
class profile extends Component { 
   
  constructor(props)
  {
    super(props);
    this.state = {
       user:{},
       id: this.props.id   
      //auth : true
    }
  }

  onChange = (e) => {
    var file = e.target.files[0];
    console.log(e.target.files[0]);



    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','zcwrt7qz');

    axios.post(
        'https://api.cloudinary.com/v1_1/dpny1nhaq/image/upload',
        formData,
        // method: 'POST',
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}
    ).then((res)=>{
        console.log(res);
        axios.put(`http://localhost:5000/api/Users/Profile/${this.props.id}`,{
            'profilePicture': res.data.secure_url
        })
    }).catch(function(err){
        console.log(err);
    });

}

  componentDidMount()
  {
     const id = this.state.id
     console.log(id)
     axios.get(`/api/Users/${id}`)
     .then(user=>this.setState({user : user.data.data}))
     .catch(console.log('cannot fetch'))
     console.log(this.state.user.profilePicture);
  }
  
  handleClick =() => {
    this.props.history.push("/signin");
 };
  render()
  {
    if (this.props.token == null) {
      return (
        <div>
          <Toolbar />
          <div class="thumbnails">
            <div class="box">
              <div class="inner">
                <h3>You have to sign in first!</h3>
                <button
                  variant="contained"
                  onClick={() => {
                    this.handleClick();
                  }}
                  className="btn"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
    return(
      <div>
        <ToolbarOUT/>
      <figure class="snip0057 red hover">
  <figcaption>
    <h2>{this.state.user.firstName} <span>{this.state.user.lastName}</span></h2>
    <p> {this.state.user.bio}</p>
    <p>{this.state.user.house}</p> 
    <p>{this.state.user.birthDate}</p>  
    <br></br>
    <br></br>
    <br></br>
    {/* <div class="icons"><a href="#"><i class="ion-ios-home"></i></a><a href="#"><i class="ion-ios-email"></i></a><a href="#"><i class="ion-ios-telephone"></i></a></div> */}
  </figcaption>
    <div class="image-upload">
      <label for="file-input">
          <img src={this.state.user.profilePicture} height="350" width="350"/>
      </label>

      <input id="file-input" type="file" onChange={this.onChange} display="none"/>
    </div>
   {/* <div class="image"><img src = {this.state.user.profilePicture} alt="sample4"/></div>  */}
  <div class="position">{this.state.user.type}</div>
</figure>
</div>
  )
  }}
}
const Form = connect(
    mapStateToProps,
    null
  )(profile);
  export default Form;