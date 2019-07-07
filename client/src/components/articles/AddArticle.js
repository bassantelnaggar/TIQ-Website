import React , {Component} from "react";

 class AddArticle extends Component {
  state = {
    title:'',
    description:'',
    body:'',
    author:'', 
    date:'',
    comments:''
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
      e.preventDefault();
      this.props.addArticle({title: this.state.title, description: this.state.description,body: this.state.body, author:this.state.author ,date:this.state.date });
      this.setState({ title: '', description: '' ,body:'',author:'',date:''});
      this.props.Close();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add article title "
            value={this.state.title}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="description"
            placeholder="Add article Description "
            value={this.state.description}
            onChange={this.onChange}
          />
           <br></br>
           <textarea
            type="textarea"
            name="body"
            placeholder="Add article body "
            style={{height: "300px"}}
            value={this.state.body}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="author"
            placeholder="Add article author "
            value={this.state.author}
            onChange={this.onChange}
          />
           <br></br>
           
          <input
            type="text"
            name="date"
            placeholder="Add article date "
            value={this.state.date}
            onChange={this.onChange}
          />
          
          <br></br>
          <input
            type="submit"
            value="Submit"
            className="btn"
          />
      </form>
    )
  }
}

export default AddArticle