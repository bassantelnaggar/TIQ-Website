import React, { Component } from "react";

export class AddFaq extends Component {
  state = {
    question: "",
    answer: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addFAQ(this.state.question, this.state.answer);
    this.setState({ question: "", answer: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  
  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit} >
        <input
          type="text"
          name="question"
          style={{ left:"14%",position:'relative',flex: "10", padding: "5px",fontFamily:'Arial',backgroundColor:"#black",color:"black",width:'50%' }}
          placeholder="Add Question ..."
          value={this.state.question}
          onChange={this.onChange}
        />
        <br></br>
        <input
          type="text"
          name="answer"
          style={{ left:"14%",position:'relative',flex: "10", padding: "5px",fontFamily:'Arial',backgroundColor:"#black",color:"black",width:'50%' }}
          placeholder="Add Answer ..."
          value={this.state.answer}
          onChange={this.onChange}
        />
<br></br>
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{flex: '1',width:'25%',left:"26%",position:'absolute'}}
          // style={{backgroundColor:"#70c7be"}}
          />
      </form>
    </div>
    );
   

  }
}

export default AddFaq;
