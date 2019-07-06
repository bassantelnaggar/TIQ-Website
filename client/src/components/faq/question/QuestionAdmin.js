import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionsAdmin from './QuestionsAdmin';
import Toolbar from "../../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../../layout/Toolbar/ToolbarSignout";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class QuestionAdmin extends Component {
  state={
      Questions:[]
  }
  handleClickWWW =() => {
    this.props.history.push("/signin");
 };
  componentDidMount()  {
    axios.get('/api/Questions/admin')
    .then(res => this.setState({ Questions: res.data.data }))
  }
  delQuestion = (id) => {
    axios.delete('/api/Questions/'+id)
      .then(res => this.setState({ Questions: [...this.state.Questions.filter(question => question._id !== id)] }));
 
}

answerQuestion = (id,answer) => {
  
  axios.put('/api/Questions/answerquestion/'+id,
  {
    "answer":answer
  })
  .then(res => {
    axios.get('/api/Questions/admin')
    .then(res => this.setState({ Questions: res.data.data }))
   
  });

}
 
  render() {
console.log(this.props.usertype)
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
                    this.handleClickWWW();
                  }}
                  className="btn"
                  style={{backgroundColor:"#70c7be"}}
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
    
        <div className="QuestionAdmin">
         <ToolbarOUT />

          <div> <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                      fontWeight: 'bold',fontSize:'80px'}} > Users'<br></br> Questions </h1>  
            <br></br>    
            <QuestionsAdmin  Questions={this.state.Questions} delQuestion={this.delQuestion} answerQuestion={this.answerQuestion} />
             
          </div>  
        </div>
   
    );
    }}
  }
}
const Form = connect(
  mapStateToProps,
  null
)(QuestionAdmin);
export default Form;
