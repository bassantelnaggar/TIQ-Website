import React , {Component} from "react";
import axios from 'axios';
import SimpleSnackbar from './SimpleSnackbar'

class AddDisciplesProgram extends Component {
  constructor(props) {
    super(props);
    
    }
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
      this.props.addDisciplesProgram.bind(this,this.state.title,
        this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link);
      this.setState({  title:'',description:'',year:'',duration:'',price:'',location:'',image:'',link:''  });
      this.props.change();

  }

  render() {
    
    return (
     
      <div>
      {/* <div Child ref={SimpleSnackbar} />; */}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            style={{ width:"400px"}}
            placeholder="Disiciples Program title "
            value={this.state.title}
            onChange={this.onChange}
          />
          <textarea
            type="text"
            name="description"
            style={{ width:"400px"}}
            placeholder="Disiciples Program Description "
            value={this.state.description}
            onChange={this.onChange}
          />
           <input
            type="text"
            name="year"
            style={{ width:"400px"}}
            placeholder="Disciples Prgram year "
            value={this.state.year}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="duration"
            style={{ width:"400px"}}
            placeholder="Disciples Program duration "
            value={this.state.duration}
            onChange={this.onChange}
          />
           
          <input
            type="text"
            name="price"            
            style={{ width:"400px"}}
            placeholder="Disciples Program price "
            value={this.state.price}
            onChange={this.onChange}
          />

            <input
            type="text"
            name="location"
            style={{ width:"400px"}}
            placeholder="Disciples Program location "
            value={this.state.location}
            onChange={this.onChange}
          />

          <input
            type="text"
            name="image"
            style={{ width:"400px"}}
            placeholder="Disciples Program image "
            value={this.state.image}
            onChange={this.onChange}
          />

           <input
            type="text"
            name="link"
            style={{ width:"400px"}}
            placeholder="Disciples Program link "
            value={this.state.link}
            onChange={this.onChange}
          />
          
          <input
            type="submit"
            style={{flex:"10px", paddingLeft:"50px"}}
            value="Submit"
            className="btn"
          />
        
          
      </form>
      
      </div>  
      
       
    
    )
  }
}

export default AddDisciplesProgram