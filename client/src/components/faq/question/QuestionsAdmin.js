import React, { Component } from 'react';
import QuestionItemAdmin from './QuestionItemAdmin';

class QuestionsAdmin extends Component {
  render() {
    return(
      <div>
      { this.props.Questions.map((question) => (
      <QuestionItemAdmin key={question._id} question={question} delQuestion={this.props.delQuestion} answerQuestion={this.props.answerQuestion} />
    ))}
    <br></br> <br></br>
    </div>
    );
  }
}


export default QuestionsAdmin;