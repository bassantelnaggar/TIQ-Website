import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';


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

  render() {
    const { _id,title,description,year,duration,price,location,image,link } = this.props.disciplesProgram;
    return (
      <div> <form>
      <label>
          <TextField
             type="text"
              name='title'
              value={this.state.title}
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit Title ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='description'
              value={this.state.description}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit description ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='year'
              value={this.state.year}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit year ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='duration'
              value={this.state.duration}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit duration ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='price'
              value={this.state.price}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit price ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='location'
              value={this.state.location}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit location ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='image'
              value={this.state.image}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit image ..."
              onChange={this.onChange}
              />
      </label>
      <label>
          <TextField 
              type="text"
              name='link'
              value={this.state.link}    
              style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
              placeholder="Edit link ..."
              onChange={this.onChange}
              />
      </label>
      <button  className="btn"  onClick={this.props.updateDisciplesProgram.bind(this,_id,this.state.title,
        this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link)} >update</button>
      <DeleteIcon  onClick={this.props.delDisciplesProgram.bind(this,_id,this.state.title,
        this.state.description,this.state.duration,this.state.location,this.state.price,this.year,this.state.image,this.state.link)}/> 
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