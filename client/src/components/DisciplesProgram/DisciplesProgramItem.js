import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


export class DisciplesProgramItem extends Component {
  state = {
    title:this.props.disciplesProgram.title,
    description:this.props.disciplesProgram.description,
    year:this.props.disciplesProgram.year,
    duration:this.props.disciplesProgram.duration,
    price:this.props.disciplesProgram.price,
    location:this.props.disciplesProgram.location,
    image:this.props.disciplesProgram.image,
    link:this.props.disciplesProgram.link,
    
    
  };

  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  onChange1 = e =>  {
    var file = e.target.files[0];
    console.log( e.target.files[0])
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zcwrt7qz");
  
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dpny1nhaq/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(res=>this.setState({image:res.data.secure_url}))     
  }
  render() {
    const { _id,title,description,year,duration,price,location,image,link } = this.props.disciplesProgram;
    return (
      <div> <form>
      <label>
        <h1>Title</h1>
          <input
             type="text"
              name='title'
              value={this.state.title}
              style={{ color:"black",width:"150%"}}
              placeholder="Edit Title ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      <h1>Description</h1>
          <textarea 
              type="text"
              name='description'
              value={this.state.description}    
              style={{  color:"black",width:"150%"}}
              placeholder="Edit description ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      <h1>Year</h1>
          <input 
              type="text"
              name='year'
              value={this.state.year}    
              style={{  color:"black",width:"150%"}}
              placeholder="Edit year ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      <h1>Duration</h1>
          <input 
              type="text"
              name='duration'
              value={this.state.duration}
              style={{  color:"black",width:"150%"}}
              placeholder="Edit duration ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      <h1>Price</h1>
          <input 
              type="text"
              name='price'
              value={this.state.price}    
              style={{  color:"black",width:"150%"}}
              placeholder="Edit price ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      <h1>Location</h1>
          <input 
              type="text"
              name='location'
              value={this.state.location}    
              style={{  color:"black",width:"150%"}}
              placeholder="Edit location ..."
              onChange={this.onChange}
              />
      </label>
      <label>
      </label>
      <label>
      <h1>Form Link</h1>
          <input 
              type="text"
              name='link'
              value={this.state.link}    
              style={{ color:"black",width:"150%"}}
              placeholder="Edit link ..."
              onChange={this.onChange}
              />
      </label>
      <br></br>
              <input 
                  type="Submit" 
                  value="Update"
                  className="button"
                  onClick={this.props.updateDisciplesProgram.bind(this,_id,this.state.title,
                    this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link)}
                

      />
      {"    "}
       <input 
                  type="Submit" 
                  value="Delete"
                  className="button"
                  onClick={this.props.delDisciplesProgram.bind(this,_id,this.state.title,
                    this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link)}
                

      />
    
{/*      
      <DeleteIcon  onClick={this.props.delDisciplesProgram.bind(this,_id,this.state.title,
        this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link)}/>  */}
  </form>
        
  

      </div>
    )
  }
}

// PropTypes
DisciplesProgramItem.propTypes = {
disciplesProgram: PropTypes.object.isRequired
}


export default DisciplesProgramItem