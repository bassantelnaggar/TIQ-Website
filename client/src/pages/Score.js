import React, { Component } from "react";
import ToolbarOUT from "../layout/Toolbar/ToolbarSignout";
import Toolbar from "../layout/Toolbar/Toolbar";
import axios from "axios";
import CustomizedTable from "../layout/Table/CustomizedTable";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
export class Score extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    };
  }
  UpdateScore = async (id,score) => {
    console.log(score);
    console.log(`/updateScores/${id}/${score}`)
       axios.put(
      `/api/Users/updateScores/${id}/${score}` )
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ scores: res.data.data }))
      });
        alert("updated");
  };
  componentDidMount() {
    console.log("ana henaa");
    axios
      .get("/api/Users")
      .then(res => this.setState({ scores: res.data.data }));
  }
  handleClick =() => {
    this.props.history.push("/signin");
 };

  render() {
    console.log("kiki");
    console.log(this.state.scores);
    if (this.props.token != null) {
      return (
        <div>
          <ToolbarOUT />

          <main className="Score__page" style={{ marginTop: "64px" }}>
            <header>Debaters Scores!!</header>
          </main>

          <CustomizedTable UpdateScore={this.UpdateScore} scores={this.state.scores} />
        </div>
      );
    } else {
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
  }
}
const Form = connect(
  mapStateToProps,
  null
)(Score);
export default Form;
