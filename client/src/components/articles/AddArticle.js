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
      
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add article title "
            style={{width:"70%",marginLeft:"14%",background:"#E0E0E0",color:"black"}}
            value={this.state.title}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="description"
            placeholder="Add article Description "
            style={{width:"70%",marginLeft:"14%",background:"#E0E0E0",color:"black"}}
            value={this.state.description}
            onChange={this.onChange}
          />
           <br></br>
           <textarea
            type="textarea"
            name="body"
            placeholder="Add article body "
            style={{height: "300px",width:"70%",marginLeft:"14%",background:"#E0E0E0",color:"black"}}
            value={this.state.body}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="author"
            placeholder="Add article author "
            style={{width:"70%",marginLeft:"14%",background:"#E0E0E0",color:"black"}}
            value={this.state.author}
            onChange={this.onChange}
          />
           <br></br>
           
          <input
            type="text"
            name="date"
            placeholder="Add article date "
            style={{width:"70%",marginLeft:"14%",background:"#E0E0E0",color:"black"}}
            value={this.state.date}
            onChange={this.onChange}
          />
          
          <br></br>
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{marginLeft:"47%",width:"20%"}}
          />
      </form>
    )
  }
}

export default AddArticle