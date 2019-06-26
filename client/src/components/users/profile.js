import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from "axios"
import "./profile.css"
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import EditIcon from "@material-ui/icons/Edit";
import PegasusLogo from "../../components/images/tiqLogo1.png"
import OrionLogo from "../../Images/rsz_1rsz_orion-logo.jpg"
import PegasusLogo3 from "../../Images/PEGASUS-LOGO.jpeg"
import {Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Background from "../../Images/about.jpg"
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
        window.location.reload();
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
        <div >
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
      <img src={Background} style={{backgroundsize: 'cover', marginTop:"-5%"}} />
     <div >
     <ToolbarOUT/>
      
       
          `<section class="card">
              <figure class="panel meta">
              <picture>
              <div class="image-upload">
              <label for="file-input">
              <img class="avatar" src={this.state.user.profilePicture} width="128" height="128"/> <EditIcon/>
              </label> 
              <input id="file-input" accept=".jpg,.png" type="file" onChange={this.onChange} display="none"/>
              
              </div>
              </picture>
              <figcaption>

              <h1 class="name">{this.state.user.firstName} {this.state.user.lastName} </h1>
              <h3 class="title">{this.state.user.bio}</h3>
              </figcaption>
              </figure>
          
              <div class="panel info">
                <dl>
                <dt>
                  <h4 className="text">Birth Day </h4>
                  <h5 className="text">{this.state.user.birthDate}</h5>
                </dt>
                {/* <dt></dt> */}
                <dd>98</dd>
                <dt>
                  <h4 className="text">Type</h4>
                  <h5 className="text">{this.state.user.type}</h5>
                </dt>
                {/* <dt></dt> */}
                <dd>98</dd>
                <dt>
                  <h4 className="text">Score</h4>
                  <h5 className="text">{this.state.user.score}</h5>
                </dt>
                {/* <dt></dt> */}
                <dd>98</dd>
                <dt>
                  <h4 className="text">House</h4>
                  <h5 className="text">{this.state.user.house}</h5>
                </dt>
                <dd>98</dd>
                <dt>
                  <h4 className="text">TIQ Status</h4>
                  <h5 className="text">{this.state.user.tiqStatus}</h5>
                </dt>
                <dd>98</dd>
                </dl>
            
            
            
          </div>
      
    </section>`


</div>
</div>
  )
  }}
}
const Form = connect(
    mapStateToProps,
    null
  )(profile);
  export default Form;