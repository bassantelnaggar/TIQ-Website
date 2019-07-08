import React, { Component } from "react";
import "./Chatbars.css";
import Header from "./Header";
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import Background from "../../Images/background.jpeg";
import Logo from "../images/debate2.jpg";
// import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
class Chatbars extends Component {
  constructor() {
    super();
    this.state = {
      chatbars: [],
      searchkey: null,
      loaded:false
    };
  }
  handleClick =() => {
     this.props.history.push("/signin");
  };
  handleClickME =() => {
    this.props.history.push("/deleteChatBar");
 };
 handleClickSearch =() => {
  this.props.history.push(`chatbars/search/${
    this.state.searchkey
  }`)
};
 
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    fetch("/api/Chatbars/")
      .then(res => res.json())
      .then(chatbars =>
        this.setState({ chatbars: chatbars.data ,loaded:true} )
      );
  }
  getStyle = () => {
    return {
      backgroundImage: Background,
      padding: "10px",
      textAlign: "center"
    };
  };

  render() {
    console.log(this.props.usertype);
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
                  //onClick={() => (document.location = "/signin")}
                  className="btn"
                >
                  Sign In
                </button>
                
              </div>
            </div>
          </div>
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
          

        </div>
      );
    }
    const auth = this.props.usertype === "TIQadmin";
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
        <div >
          <div>
            <ToolbarOUT />
            <button
            className="button"
             background = "#202024"
            style={{ position: "absolute", left: "20px", top: "63px" }}
            onClick={() => {
              this.handleClickME();
            }}
          >
         Manage Debate Live
          </button>
          <div style={{ right: "0", top: "63px" }}>
            <button
             className="button"
             background = "#202024"
              style={{ position: "absolute", right: "10px", top: "63px" }}
              onClick={() => {
                this.handleClickSearch();
              }}
              // onClick={() =>
              //   (document.location.href = `chatbars/search/${
              //     this.state.searchkey
              //   }`)
              // }
            >
              Search
            </button>
            <input
              type="text"
              name="searchkey"
              style={{
                flex: "10",
                padding: "5px",
                position: "absolute",
                 width: "26%",
                right: "180px",
                top: "60px",
                color: "black"
              }}
              placeholder="Search Debate Live"
              value={this.state.searchkey}
              onChange={this.onChange}
            />
            <br></br>
            <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'fixed',
                      fontWeight: 'bold',fontSize:'60px'}} > Let's Debate Live!  </h1>
        
          </div>
          <div class="inner">
            <div class="thumbnails">
              {this.state.chatbars.map(chatbar => (
                <div class="box">
                  <Link to={"/tryme/" + chatbar._id} class="image fit">
                    <img src={Logo} alt="" />
                  </Link>
                  <div class="inner">
                    <h3>{chatbar.date}</h3>
                    <p>{chatbar.debateLiveTitle} </p>
                    <p>{"Number of Responses: "}{chatbar.numberOfResponses} </p>
                    <Link to={"/tryme/" + chatbar._id} class="button"  style={{background:"#202024 "}}>
                      Debate it Now!
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          

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
          

        </div>
      );
    } else {
      return (
        <div >
          <div>
            <ToolbarOUT />
            <div style={{ right: "0", top: "63px" }}>
            <button
              class="button"
              style={{background:"#202024 "}}
              style={{ position: "absolute", right: "0", top: "63px" }}
              onClick={() => {
                this.handleClickSearch();
              }}
              // onClick={() =>
              //   (document.location.href = `chatbars/search/${
              //     this.state.searchkey
              //   }`)
              // }
            >
              Search
            </button>
            <input
              type="text"
              name="searchkey"
              style={{
                flex: "10",
                padding: "5px",
                position: "absolute",
                 width: "26%",
                right: "170px",
                top: "60px",
                color: "black"
              }}
              placeholder="Search Debate Live"
              value={this.state.searchkey}
              onChange={this.onChange}
            />
            <br></br>
            <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'fixed',
                      fontWeight: 'bold',fontSize:'60px'}} > Let's Debate Live!  </h1>
          </div>
          <div class="inner">
            <div class="thumbnails">
              {this.state.chatbars.map(chatbar => (
                <div class="box">
                  <Link to={"/tryme/" + chatbar._id} class="image fit">
                    <img src={Logo} alt="" />
                  </Link>
                  <div class="inner">
                    <h3>{chatbar.date}</h3>
                    <p>{chatbar.debateLiveTitle} </p>
                    <p>{"Number of Responses: "}{chatbar.numberOfResponses} </p>
                    <Link to={"/tryme/" + chatbar._id} class="button"  style={{background:"#202024 "}}>
                      Debate it Now!
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

       

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
          

        </div>
        
      );
    }
  }
  }
}
const Form = connect(
  mapStateToProps,
  null
)(Chatbars);

export default Form;