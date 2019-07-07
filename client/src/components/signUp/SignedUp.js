import React, { Component } from 'react';
import SignedUps from './SignedUps';
import Toolbar from "../../layout/Toolbar/Toolbar"
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout"
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
    // axios.delete('/api/SignedUp/'+id)
    // .then(res => this.setState({ SignedUp: [...this.state.SignedUp.filter(signedUp => signedUp._id !== id)] }));
    alert("Accepted successfully!")

  }
  handleClick =() => {
    this.props.history.push("/signin");
 };
 handleClickME =() => {
  this.props.history.push("/getUsers");
};
  render() {
    //const { classes } = this.props;
    const headerStyle = {
 
      color: '#191b1c',
      textAlign: 'center',
       //padding: '30px',
      position: "absolute", top: "145px",
      left: '0',
      width:'100%',
      lineHeight: '1',
      fontWeight: 'bold',
      // textShadow: '2px 2px 4px #000000b3',
      fontSize:'70px',
      
    }

    if (this.props.token === null) {
      return (
        <div>
          <Toolbar/>
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
                  style={{background:"#333"}}
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
      const auth = this.props.usertype === "TIQadmin";
    if (auth) {
    return (
     <div>
        <div >
        <ToolbarOUT />
        <div/>
        <input 
                  type="Submit" 
                  value="Back"
                  className="btn"
                  onClick={() => {
                    this.handleClickME();
                  }}
                  style={{ position: "absolute", left: "20px", top: "63px"}}
                  />
       
          <div>
          <br></br>
          <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'fixed',
                      fontWeight: 'bold',fontSize:'60px'}} >NEW MEMBERS <br></br>CONFIRMATION LIST  </h1>
            
            <SignedUps  SignedUp={this.state.SignedUp} decline={this.decline} accept={this.accept} />
             
          </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       
        <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
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
