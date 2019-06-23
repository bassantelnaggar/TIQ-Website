import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DisciplesPrograms from './DisciplesPrograms';
// import uuid from 'uuid';
import axios from 'axios';
import Toolbar from "../../layout/Toolbar/Toolbar";
import AddDisciplesProgram from './AddDisciplesProgram';


class DisciplesProgram extends Component {
  state = {
    disciplesPrograms: []
  }

  componentDidMount() {
    axios.get('api/DisciplesProgram')
      .then(res => this.setState({ disciplesPrograms: res.data.data }))
  }

  // Delete DisciplesProgram
  delDisciplesProgram= (id) => {
    axios.delete('api/DisciplesProgram/'+id)
    .then(res => this.setState({ disciplesPrograms: [...this.state.disciplesPrograms.filter(disciplesProgram => disciplesProgram._id !== id)] }));
    alert("Deleted successfully!")
}
  //create DisciplesProgram
addDisciplesProgram=(title,description,duration,location,price,year,image,link) => {
  console.log("added");
  axios.post('/api/DisciplesProgram', {
    title,description,duration,location,price,year,image,link
  })
    .then(res => this.setState({ disciplesPrograms: res.data.data }));
    alert("Added successfully!");
}

//Update DisciplesProgram
updateDisciplesProgram = (id,title,description,duration,location,price,year,image,link) => {
    console.log(title)
    axios.put('/api/DisciplesProgram/edit/'+id,
   {
    "title":title,
	"description":description,
	"duration":duration,
	"location":location,
	"price":price,
	"year":year,
	"image":image,
	"link":link
   })
   .then(res => {
     axios.get('api/DisciplesProgram')
     .then(res => this.setState({ disciplesPrograms: res.data.data }))
      alert("Updated successfully!")
   });
 
}
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
        <Toolbar></Toolbar>
            <AddDisciplesProgram addDisciplesProgram={this.addDisciplesProgram}/> 
            <DisciplesPrograms disciplesPrograms={this.state.disciplesPrograms}
             delDisciplesProgram={this.delDisciplesProgram} 
            updateDisciplesProgram={this.updateDisciplesProgram} />

          </div>  
        </div>
      </Router>
    );

  }
}

export default DisciplesProgram;