import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DisciplesPrograms from './DisciplesPrograms';
// import uuid from 'uuid';
import axios from 'axios';
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import AddDisciplesProgram from './AddDisciplesProgram';
import SimplePopper from './SimplePopper';
import UpdateSimpleSnackbar from './UpdateSimpleSnackbar.';
import CreateSimpleSnackbar from './CreateSimpleSnackbar';
import DelSimpleSnackbar from './DelSimpleSnackbar';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
class DisciplesProgram extends Component {
  
  state = {
    
    disciplesPrograms: [],
    created:false,
    updated:false,
    deleted:false,
    titleundo:'',
    descriptionundo:'',
    yearundo:'',
    durationundo:'',
    priceundo:'',
    locationundo:'',
    imageundo:'',
    linkundo:''
  }

  componentDidMount() {
    axios.get('api/DisciplesProgram')
      .then(res => this.setState({ disciplesPrograms: res.data.data }))
  }

  // Delete DisciplesProgram
 delDisciplesProgram= (id,title,description,duration,location,price,year,image,link) => {
    axios.delete('api/DisciplesProgram/'+id)
    .then(res => this.setState({ disciplesPrograms: [...this.state.disciplesPrograms.filter(disciplesProgram => disciplesProgram._id !== id)] }));
     this.setState({ titleundo:title,
    descriptionundo:description,
    yearundo:year,
    durationundo:duration,
    priceundo:price,
    locationundo:location,
    imageundo:image,
    linkundo:link })
    this.setState({deleted:true});
}
  //create DisciplesProgram
addDisciplesProgram=(title,description,duration,location,price,year,image,link) => {
  console.log("added");
  axios.post('/api/DisciplesProgram/', {
    title,description,duration,location,price,year,image,link
  })
  .
  then(res => this.setState({ disciplesPrograms: res.data.data }))  
  this.setState({created:true});
}
undo = () => {
  this.addDisciplesProgram(
    this.state.titleundo,
    this.state.descriptionundo,
    this.state.durationundo,
    this.state.locationundo,
    this.state.priceundo,
    this.state.yearundo, 
    this.state.imageundo,
    this.state.linkundo );
}
change1=()=>{
  this.setState({ deleted: false,updated:false ,created:false })
}
//Update DisciplesProgram
updateDisciplesProgram = (id,title,description,duration,location,price,year,image,link) => {
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
     this.setState({updated:true});
    });
    this.setState({updated:true});

}

//   undo=()=> {console.log("undo")
//     addDisciplesProgram(this.state.titleundo,
//     this.state.descriptionundo,
//     this.state.yearundo,
//     this.state.durationundo,
//     this.state.priceundo,
//     this.state.locationundo,
//     this.state.imageundo,
//     this.state.linkundo );
// }
  render() {
    if (this.props.token === null) {
    return (
      
        
        <div className="App">
        <Toolbar/>
          <div className="container">
       
        <SimplePopper addDisciplesProgram={this.addDisciplesProgram} undo={this.undo}/>
        <br></br>
            <DisciplesPrograms disciplesPrograms={this.state.disciplesPrograms}
             delDisciplesProgram={this.delDisciplesProgram} addDisciplesProgram={this.addDisciplesProgram}
            updateDisciplesProgram={this.updateDisciplesProgram} />
          </div>  
          {this.state.deleted && <DelSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.updated && <UpdateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.created && <CreateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          
        </div>
      
    );
    }
    else{
      return (
      
        
        <div className="App">
        <ToolbarOUT/>
          <div>
       
        <SimplePopper addDisciplesProgram={this.addDisciplesProgram} undo={this.undo}/>
        <br></br>
            <DisciplesPrograms disciplesPrograms={this.state.disciplesPrograms}
             delDisciplesProgram={this.delDisciplesProgram} addDisciplesProgram={this.addDisciplesProgram}
            updateDisciplesProgram={this.updateDisciplesProgram} />
          </div>  
          {this.state.deleted && <DelSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.updated && <UpdateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.created && <CreateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          
        </div>
      
    );
    }

  }
}
const Form = connect(
  mapStateToProps,
  null
)(DisciplesProgram);

export default Form;