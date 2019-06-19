import React, { Component } from 'react';

export class UpdateArticle extends Component {

  state = {
      title: '',
      description: '',
      body:''
  } 

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  
    
  render() {
    return (
        <div>
        <input
          type="text"
          name="title"
          placeholder={this.props.article.title}
          onChange={this.onChange}
        />
        <br></br>
        <input
          type="text"
          name="description"
          placeholder={this.props.article.description}
          onChange={this.onChange}
        />
         <br></br>
        <textarea
          type="textarea"
          name="body"
          placeholder={this.props.article.body}
          style={{height: "300px"}}
          onChange={this.onChange}
        />
        <br></br>
        <button onClick={this.props.updateArticle.bind(this, {_id: this.props.article._id, title:this.state.title, description: this.state.description,body: this.state.body})}>
        UPDATE
        </button>
        </div>
    )
  }
}

export default UpdateArticle