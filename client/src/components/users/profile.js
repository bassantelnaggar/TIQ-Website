import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from "axios"
import "./profile.css"
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import EditIcon from "@material-ui/icons/Edit";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import "../../pages/Homee/assets/css/main.css"
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      id: this.props.id
      //auth : true
    };
  }

  onChange = e => {
    var file = e.target.files[0];
    console.log(e.target.files[0]);

    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zcwrt7qz");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dpny1nhaq/image/upload",
        formData,
        // method: 'POST',
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(res => {
        console.log(res);
        axios.put(`/api/Users/Profile/${this.props.id}`,{
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

  handleClick = () => {
    this.props.history.push("/signin");
  };
  render() {
    if (this.props.token == null) {
      return (
        <>
        <div>
          <Toolbar/>
          </div>
          <div class="thumbnails">
            <div class="box">
              <div class="inner">
                <h3>You have to sign in first!</h3>
               
                <button
                  variant="contained"
                  onClick={() => {
                    this.handleClick();
                  }}
                  //onClick={() => (document.location = "/signin")}
                  className="btn"
                >
                  Sign In
                </button>
                
              </div>
            </div>
          </div>
         
          <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div>
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>
        </>
      );
    }
    else{
    return(
      <>
      <div>
        <ToolbarOUT />
      </div>
      `<section class="card">
              <figure class="panel meta">
              <picture>
              <div class="image-upload">
              <label for="file-input">
              <img class="avatar" src={this.state.user.profilePicture} width="128" height="128"/> 
              
              <CameraIcon />
              </label> 
              <input id="file-input"   accept=".jpg,.png" type="file" onChange={this.onChange} display="none"/>
              
              </div>
              </picture>
              <figcaption>

              <h1 class="name" style={{fontWeight:'bold'}}>{this.state.user.firstName} {this.state.user.lastName} </h1>
              <h2 >{this.state.user.bio}</h2>
              </figcaption>
              </figure>

              <div class="panel info">
                <dr> <EditIcon style={{color:'#696969',position:'relative',right:'-650px'}}/></dr>
             
                <dl>
                  <dt>
                    <h4 className="text" style={{fontWeight:'bold'}}>Birth Date </h4>
                    <h5 className="text">{this.state.user.birthDate}</h5>
                  </dt>
                  {/* <dt></dt> */}
                  <dd>98</dd>
                  <dt>
                    <h4 className="text"style={{fontWeight:'bold'}}>Type</h4>
                    <h5 className="text">{this.state.user.type}</h5>
                  </dt>
                  {/* <dt></dt> */}
                  <dd>98</dd>
                  <dt>
                    <h4 className="text"style={{fontWeight:'bold'}}>Score</h4>
                    <h5 className="text">{this.state.user.score}</h5>
                  </dt>
                  {/* <dt></dt> */}
                  <dd>98</dd>
                  <dt>
                    <h4 className="text"style={{fontWeight:'bold'}}>House</h4>
                    <h5 className="text">{this.state.user.house}</h5>
                  </dt>
                  <dd>98</dd>
                  <dt>
                    <h4 className="text"style={{fontWeight:'bold'}}>TIQ Status</h4> 
                    <h5 className="text">{this.state.user.tiqStatus} </h5>
                     </dt>
                  <dd>98</dd>
                  
                </dl>
              </div>
            </section>
           
            <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div >
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>
          

    </>
      );
      
    }
  }
}
const Form = connect(
  mapStateToProps,
  null
)(profile);
export default Form;
