import React, { Component } from "react";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import DetailedExpansionPanel from "./DetailedExpansionPanel";
import FormDialog from "./FormDialog";
import Toolbar from "../../layout/Toolbar/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ourPeopleBG from '../../pages/Homee/images/ourpeoplebg.png'
import SearchUser from '../users/searchUser'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class GetUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loaded:false,
      searchkey: null,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    axios.get("/api/Users").then(res => {
      this.setState({ users: res.data.data,loaded:true });
    });
  }
  deleteUser = id => {
    console.log(id);

    axios.delete("/api/Users/" + id)
    .then(
      this.setState({
        users: [...this.state.users.filter(user => user._id !== id)]
      })
    );
  };
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleUpdateClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClickSearch =() => {
    this.props.history.push(`getUsers/search/${
      this.state.searchkey
    }`)
  };
  handleClick =() => {
    this.props.history.push("/signedUp");
  };
  handleClickME =() => {
    this.props.history.push("/signin");
  };

  update =  (id,
    type,
    house,
    din,
    dor,
    tiqStatus,
    supervisorType,
    score
    ) => {
      console.log(type)
      console.log(house)
      console.log(din)
      console.log(tiqStatus)
      console.log(supervisorType)
      console.log(score)

    if(type=="member"){
      axios.put("api/Users/update/admin/" + id, {
        house,
        din,
        tiqStatus,
        supervisorType,
        score})
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
    if(type=="disciple"){
      axios.put("api/Users/update/admin/" + id, {
        house ,
        score
               })
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
    if(type=="alumni"){
      axios.put("api/Users/update/admin/" + id, {
      din,
      dor,
      type,
      house
      })
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
  ;

    // if (Object.keys(update.data)[0] === "err")
    //   this.setState({ Error: "Invalid/Missing Information" });
    // else window.location.reload();
    /*
     * axios ... put whatver using this.state.firstName, this.staet.lastName
     */
  };

  render() {
    const auth = this.props.usertype === "TIQadmin";
    if (this.props.token === null) {
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
                    this.handleClickME();
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
      )
    }
    else{
      if(!this.state.loaded){
        return (
          <>
          <ToolbarOUT />
          <div style={{position: 'fixed',top: '50%',left: '50%'}}>
        <CircularProgress/>
        </div>
        </>
        )
      }
      else{

    if (auth) {
    return (
      <>
        <ToolbarOUT />
      
        <div className="center-div">
        <input 
                  type="Submit" 
                  value="Confirm New Memebers"
                  className="btn"
                  onClick={() => {
                    this.handleClick();
                  }}
                  style={{ position: "absolute", left: "20px", top: "63px"}}
                  />
                  <br></br>
        <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'fixed', 
                      fontWeight: 'bold',fontSize:'75px'}} >Our People</h1>
         
          {/* <TextField
              id="selecteduser"
              label=  {"Search User"}
              type= "textField"
              name="searchkey"
              value={this.state.searchkey}
              onChange={this.onChange}
             style={{ left: "520px", top: "-155px"  }}
            />

            <Button
              variant="extended"
              aria-label="Search by FirstName"
              onClick={this.handleClickSearch}
             style={{ left: "540px", top: "-145px",  background:"#333"}}
            >
              Search User 
              <SearchIcon />
            </Button>
             */}
          <ul>
         
          
            {this.state.users && (
              <DeleteUser
                users={this.state.users}
                deleteUser={this.deleteUser}
                update={this.update}
              />
            )}
          </ul>
        </div>
        <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
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
    return (
      <>
        <ToolbarOUT />
        
        <div className="center-div">
        <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'fixed', 
                      fontWeight: 'bold',fontSize:'75px'}} >Our People</h1>
         
    
          {/* <TextField
              id="selecteduser"
              label=  {"Search User"}
              type= "textField"
              name="searchkey"
              value={this.state.searchkey}
              onChange={this.onChange}
             style={{ left: "520px", top: "-150px"  }}
            />

            <Button
              variant="extended"
              aria-label="Search by FirstName"
              onClick={this.handleClickSearch}
             style={{ left: "540px", top: "-140px",  background:"#333"}}
            >
              Search User 
              <SearchIcon />
            </Button> */}
          <ul>
            {this.state.users && (
              <DeleteUser
                users={this.state.users}
                deleteUser={this.deleteUser}
                update={this.update}
              />
            )}
          </ul>
        </div>
        <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
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
}
}
}
}

const Form = connect(
  mapStateToProps,
  null
)(GetUsers);

export default Form;
// export default GetUsers;