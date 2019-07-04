import React, { Component } from "react";
import axios from "axios";
import "./Chatbars.css";
import ToolBar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import Header from './Header';
import Logo from '../images/debate2.jpg';
import Background from '../../Images/background.jpeg';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class SearchDebateLive extends Component {
  componentDidMount() {
    const { title } = this.props.match.params;
    axios
      .get(`/api/chatbars/Search/${title}`)
      .then(res => this.setState({ chatbars: res.data.data }));
  }
  handleClick =() => {
    this.props.history.push("/chatbars");
  };
  constructor(props) {
    super(props);
    this.state = {
      chatbars: []
    };
  }
  getStyle = () => {
    return {
      backgroundImage:Background,
      padding: '10px',
      textAlign: 'center'
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
       <div style={this.getStyle()} >
      <div>
        <ToolbarOUT />
        <Header />
        <button
            className="button"
            background = "#202024"
            style={{ position: "absolute", left: "20px", top: "63px" }}
            onClick={() => {
              this.handleClick();
            }}
          >
            BACK
          </button>
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
                  <Link to={"/tryme/" + chatbar._id} class="button" style={{background:"#202024 "}}>
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
       
      </>
    );
  }
}

const Form = connect(
  mapStateToProps,
  null
)(SearchDebateLive);

export default Form;

//export default SearchDebateLive;
