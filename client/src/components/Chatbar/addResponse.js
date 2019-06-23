import React, { Component } from "react";
import axios from "axios";
import "./Chatbars.css";
import "./title.css"
// import Header from "./Header";
import Toolbar from "../../layout/Toolbar/Toolbar";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
export class addResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbars: [],
      forResponses_: [],
      againstResponses_: [],
      forResponses: null,
      againstResponses: null,
      user:{}
    };
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    if(this.state.againstResponses!==null){
    this.addAgainstResponse({
        _id: this.props.match.params.key,
        againstResponses: this.state.user.firstName +" "+ this.state.user.lastName +" : "+ this.state.againstResponses
      })}
    if(this.state.forResponses!==null){
    this.addForResponse({
      _id: this.props.match.params.key,
      forResponses: this.state.user.firstName +" "+ this.state.user.lastName +" : "+ this.state.forResponses
    })}
  this.setState({ againstResponses: ''});
  this.setState({ forResponses: ''});
  };
 
 
  addForResponse(chatbar) {
    axios.put(
      " /api/Chatbars/for/" + this.props.match.params.key,
      {
        forResponses: [chatbar.forResponses]
      }
    )
    .then(res => this.setState({ forResponses_: [...this.state.forResponses_, res.data.data] }));
      alert("Added successfully!");
    // alert("Your response has been added successfully, please refresh the page");
    //  .then(res => this.setState({ chatbars: [...this.state.chatbars, res.data] },console.log(forResponses_)));
  }
  addAgainstResponse(chatbar) {

    axios.put(
      " /api/Chatbars/against/" +
        this.props.match.params.key,
      {
        againstResponses: [chatbar.againstResponses]
      }
    )
    .then(res => this.setState({ againstResponses_: [...this.state.againstResponses_, res.data.data] }));

  
    // alert("Your response has been added successfully, please refresh the page");
    //  .then(res => this.setState({ chatbars: [...this.state.chatbars, res.data] },console.log(forResponses_)));
  }

  componentDidMount() {
    const id = this.props.match.params.key;
    axios.get('/api/Users/'+ this.props.id)
    .then(user=>this.setState({user : user.data.data},()=>console.log("fetched",user.data.data)))
    .catch(console.log('cannot fetch'))
    fetch("/api/Chatbars/" + id)
      .then(res => res.json())
      .then(chatbars =>
        this.setState({ chatbars: chatbars }, () =>
          console.log("chatbars fetched...", chatbars)
        )
      );
    fetch("/api/Chatbars/getAllForResponses/" + id)
      .then(res => res.json())
      .then(forResponses_ =>
        this.setState({ forResponses_: forResponses_}))
      ;
     

    fetch("/api/Chatbars/getAllAgainstResponses/" + id)
      .then(res => res.json())
      .then(againstResponses_ =>
        this.setState({ againstResponses_: againstResponses_ }, () =>
          console.log("chatbars fetched...", againstResponses_)
        )
      );
  }
  getStyle = () => {
    return {
      // background: '#f4f4f4',
      padding: "10px",
      textAlign: "bottom"
    };
  };
  styleBottom = () => {
    return {
      position: "absolute",
      width: "50%",
      bottom: "10px"
    };
  };
  styleBottomRight = () => {
    return {
      position: "absolute",
      width: "20%",
      bottom: "10px",
      left: "795px"
    };
  };

  
  render() {
    return (

      <div style={this.getStyle()}>
          <div>
          <Toolbar />

          
          <br /> 
          <header
            style={{
              fontSize:"30px",
              color: '#E2A325',
              textAlign: 'center',
              padding: '50px',
              // postion:'relative',
              // top: '0',
              // width:' 100%'
            }}
          >
           <h1> {this.state.chatbars.debateLiveTitle}</h1>
            <br></br>
            <br></br>
            Number Of <br></br>
            Responses : {this.state.chatbars.numberOfResponses}
          </header>
          
        </div>
      
       
        <div
              style={{
                fontSize: "20px",
                color: "black",
                position: "absolute",
                top: "95px"
              }}
            >
          <div style={{ fontSize: "20px", color: "black",postion:"absolute",top: "84px",left:"50px" }}>
            <h1> WITH <br/> RESPONSES </h1>
             
            {this.state.forResponses_.map(forResponse => (
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  color: "white"
                   // right: "480px"
                }}
              >
              <div className="speech-bubble">
                {forResponse} </div>
                <br/> 
              </p>
             
            )
            )}

            </div>
            <div
            style={{
              fontSize: "15px",
              padding:"5px",
              color: "black",
              position: "absolute",
              top:"-3px"
            }}
            >
             <div style={{fontSize: "20px", color: "white",position: "absolute", top: "2px" ,left:"1020px"}}>
              <h1> AGAINST RESPONSES </h1>
              {this.state.againstResponses_.map(againstResponse => (
                <center>
                   
                  <p> <div className="speech-bubble2"> {againstResponse}</div></p>
                </center>
              ))}
            </div></div>
           
            <div style={this.styleBottom()}>
            <form onSubmit={this.onSubmit} style={{ display: "flex" }}>

              <input
                type="text"
                name="forResponses"
                style={{
                  flex: "10",
                  padding: "5px",
                  position: "fixed",
                  width: "26%",
                  bottom: "2px",
                  color: "black"
                }}
                placeholder="Write your response here if you are with..."
                value={this.state.forResponses}
                onChange={this.onChange}
              />
              <b> </b>
              <input
                type="Submit"
                value="Submit"
                className="btn"
                // onClick={this.addForResponse.bind(this, {
                //   _id: this.props.match.params.key,
                //   forResponses: this.state.user.firstName +" "+ this.state.user.lastName+" : " +this.state.forResponses
                // })}
                style={{ flex: "1", position: "fixed", bottom: "2px",left: "375px" }}
               
              />
            </form>

            </div>
            <div style={this.styleBottomRight()}>
            <form onSubmit={this.onSubmit} style={{ display: "flex" }}>

              <input
                type="text"
                name="againstResponses"
                style={{
                  flex: "10",
                  padding: "5px",
                  position: "fixed",
                  width: "26%",
                  bottom: "2px",
                  color: "black"
                }}
                placeholder="Write your response here if you are against..."
                value={this.state.againstResponses}
                onChange={this.onChange}
              />
              <b> </b>
              <input
                type="Submit"
                value="Submit"
                className="btn"
                // onClick={this.addAgainstResponse.bind(this, {
                //   _id: this.props.match.params.key,
                //   againstResponses: this.state.user.firstName +" "+ this.state.user.lastName +" : "+ this.state.againstResponses
                // })}
                style={{ flex: "1",position: "fixed", bottom: "2px",left: "1165px"  }}
              />
            </form>

            </div>
          </div>
        
      </div>
    );
  }
}
const Form = connect(
  mapStateToProps,
  null
)(addResponse);

export default Form;
