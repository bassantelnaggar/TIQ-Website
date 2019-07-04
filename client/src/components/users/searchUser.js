import React, { Component } from "react";
import axios from "axios";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import Background from '../../Images/background.jpeg';
import { connect } from "react-redux";
import "./DeleteUser.css";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
      }
  componentDidMount() {
    const { firstName } = this.props.match.params;
     axios
      .get(`/api/Users/search/${firstName}`)
      .then( res => this.setState({ users: res.data.data }))
      .catch(console.log('cannot fetch'))
  }
  handleClick =() => {
    this.props.history.push("/getUsers");
  };
 
  getStyle = () => {
    return {
      backgroundImage:Background,
      padding: '10px',
      textAlign: 'center'
    }
  }
  render() {
      console.log(this.state.users)
    return (
      <>
       <div style={this.getStyle()} >
      <div>
        <ToolbarOUT />
        
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
            {this.state.users.map(user => (
              <div class="box">
                <div class="inner">
                  <h3>{user.firstName}</h3>
                  <p>{user.lastName} </p>
                </div>
              </div>
            ))}
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
}

const Form = connect(
  mapStateToProps,
  null
)(SearchUser);

export default Form;

//export default SearchDebateLive;