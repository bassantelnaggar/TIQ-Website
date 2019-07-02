import React, { Component } from 'react';
import axios from 'axios';
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

export class createDisciple extends Component {
        constructor() {
          super();
          this.state = {
            disciplesPrograms:[],
            title:"",
            description:"",
            duration:"",
            location:"",
            price:null,
            year:"",
            image:"",
            link:""
          };
          
        }
  componentDidMount() {
      fetch('/api/DisciplesProgram/')
      .then(res => res.json())
      .then(disciplesPrograms => this.setState({disciplesPrograms: disciplesPrograms.data}, () => console.log('Disciples Programs fetched...', disciplesPrograms)));
  }
  onSubmit= (e) => {
    e.preventDefault();
       this.setState({title:''})
       this.setState({description:''})
       this.setState({duration:''})
       this.setState({location:''})
       this.setState({price:''})
       this.setState({year:''})
       this.setState({image:''})
       this.setState({link:''})
    this.render();
}
handleClick =() => {
  this.props.history.push("/DisciplesProgram");
};
onChange= (e) => this.setState({[e.target.name]: e.target.value});

  getStyle = () => {
    return {

      padding: '10px',
      textAlign: 'bottom'
    }
  }
 
  
       addDisciplesProgram = () => {
        axios.post(' /api/DisciplesProgram/', {
            title:this.state.title,
            description:this.state.description,
            duration:this.state.duration,
            location:this.state.location,
            price:this.state.price,
            year:this.state.year,
            image:this.state.image,
            link:this.state.link
        })
          .then(res => this.setState({ disciplesPrograms: [...this.state.disciplesPrograms, res.data.data] }));
          alert("The new motion has been added successfully");
      }
      render() {
        const auth = this.props.usertype === "TIQadmin";
        if (auth) {
        return (
          <div style={this.getStyle()}  >
        <div>
        <ToolbarOUT/>
       
        <button
            className="btn"
            style={{ position: "absolute", left: "20px", top: "63px",background:"#333" }}
            onClick={() => {
              this.handleClick();
            }}
          >
            BACK
          </button>
      </div>
      <form onSubmit={this.onSubmit} >
             <Grid container spacing={3}>
             <Grid item xs={6}>
            <input
                 type="text"
                 name="title" 
                style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="title"
                 value={this.state.title}
                 onChange={this.onChange}
                 />
        </Grid>
        <Grid item xs={6}>
         
          <textarea
                 type="text"
                 name="description" 
                style={{flex: '10' , padding: '5px',color:"black",height:"53px"}}
                 placeholder="description"
                 value={this.state.description}
                 onChange={this.onChange}
                 />
         
        </Grid>
        </Grid>
              
            <Grid container spacing={3}>
             <Grid item xs={6}>
             <input
                 type="text"
                 name="duration" 
                style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="duration"
                 value={this.state.duration}
                 onChange={this.onChange}
                 />
        </Grid>
        <Grid item xs={6}>
        <input
                 type="text"
                 name="location" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="location"
                 value={this.state.location}
                 onChange={this.onChange}
                 /> 
        </Grid>
        </Grid>
               
                  <Grid container spacing={3}>
             <Grid item xs={6}>
             <input
                 type="text"
                 name="price" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="price"
                 value={this.state.price}
                 onChange={this.onChange}
                 />
        </Grid>
        <Grid item xs={6}>
        <input
                 type="text"
                 name="year" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="year"
                 value={this.state.year}
                 onChange={this.onChange}
                 />
        </Grid>
        </Grid>
                
                  <Grid container spacing={3}>
             <Grid item xs={6}>
             <input
                 type="text"
                 name="image" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="image"
                 value={this.state.image}
                 onChange={this.onChange}
                 />
        </Grid>
        <Grid item xs={6}>
        <input
                 type="text"
                 name="link" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="link"
                 value={this.state.link}
                 onChange={this.onChange}
                 />
        </Grid>
        <Grid item xs={12}>
          <input 
                  type="Submit" 
                  value="Create"
                  className="btn"
                  onClick= {this.addDisciplesProgram}
                  style={{flex: '1',width:'25%',left:"38%",position:'absolute'}}
                  />
        </Grid>
        </Grid>
        
            </form>
            <br></br>
            <br></br>
            <div class="thumbnails">
            {this.state.disciplesPrograms.map(disciplesProgram =>
							<div class="box">
							 <div class="inner">
									<h3>{disciplesProgram.title}</h3>
									<p> {disciplesProgram.description} </p>
                
								</div>
							</div>)}
          
          </div>
       
        </div>
        
        )
      }
    }
}
const Form = connect(
  mapStateToProps,
  null
)(createDisciple);

export default Form;
