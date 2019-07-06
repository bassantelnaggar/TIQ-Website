import React, { Component } from 'react';
import QuestionItem from './QuestionItem';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    return (
      <div  style={{position:'absolute',top:"260px"}}>
      {this.props.Questions.map((question) => (
      <QuestionItem key={question._id} question={question} /> )) }
    </div>
    );
  }
}


export default Questions;