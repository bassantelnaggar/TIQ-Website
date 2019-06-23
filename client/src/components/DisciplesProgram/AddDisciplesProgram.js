import React , {Component} from "react";

 class AddDisciplesProgram extends Component {
  state = {
    title:'',
    description:'',
    year:'',
    duration:'',
    price:'',
    location:'',
    image:'',
    link:''  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
      e.preventDefault();
      this.props.addDisciplesProgram(this,this.state.title,
        this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link);
      this.setState({  title:'',description:'',year:'',duration:'',price:'',location:'',image:'',link:''  });
      
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Disiciples Program title "
            value={this.state.title}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="description"
            style={{height: "300px"}}
            placeholder="Disiciples Program Description "
            value={this.state.description}
            onChange={this.onChange}
          />
           <br></br>
           <textarea
            type="textarea"
            name="year"
            placeholder="Disciples Prgram year "
            value={this.state.year}
            onChange={this.onChange}
          />
          <br></br>
          <input
            type="text"
            name="duration"
            placeholder="Disciples Program duration "
            value={this.state.duration}
            onChange={this.onChange}
          />
           <br></br>
           
          <input
            type="text"
            name="price"
            placeholder="Disciples Program price "
            value={this.state.price}
            onChange={this.onChange}
          />
                    <br></br>

            <input
            type="text"
            name="location"
            placeholder="Disciples Program location "
            value={this.state.location}
            onChange={this.onChange}
          />
                    <br></br>

          <input
            type="text"
            name="image"
            placeholder="Disciples Program image "
            value={this.state.image}
            onChange={this.onChange}
          />
                    <br></br>

           <input
            type="text"
            name="link"
            placeholder="Disciples Program link "
            value={this.state.link}
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

export default AddDisciplesProgram