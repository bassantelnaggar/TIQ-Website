import React, { Component } from 'react';

export class UpdateContent extends Component {

  state = {
      name: '',
      description: ''
  } 

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  
    
  render() {
    return (
        <div>
        <input
          type="text"
          name="date"
          placeholder="Add  Content date ..."
          onChange={this.onChange}
        />
        <br></br>
        <input
          type="text"
          name="description"
          placeholder={this.props.content.description}
          onChange={this.onChange}
          
        />
        <br></br>
        <input
            type="text"
            name="type"
            placeholder="Add  Content type ..."
            value={this.state.type}
            onChange={this.onChange}
          />
          <br></br>
          <input 
                 type="Submit" 
                 value="Update"
                 className="btn"
                 onClick={this.props.updateContent.bind(this, {_id: this.props.content._id, date:this.state.name, description: this.state.description,type:this.state.type})}
                 style={{flex: '10'}}
                  />
        {/* <button class="btn" 
         onClick={this.props.updateContent.bind(this, {_id: this.props.content._id, date:this.state.name, description: this.state.description,type:this.state.type})}>
        UPDATE
        </button> */}
        </div>
    )
  }
}

export default UpdateContent
