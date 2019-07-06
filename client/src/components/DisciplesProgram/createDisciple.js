import React, { Component } from 'react';
import axios from 'axios';
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import SimplePopper from './SimplePopper';
import UpdateSimpleSnackbar from './UpdateSimpleSnackbar.';
import CreateSimpleSnackbar from './CreateSimpleSnackbar';
import DelSimpleSnackbar from './DelSimpleSnackbar';
import DisciplesPrograms from './DisciplesPrograms';
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

export class createDisciple extends Component {
        
          state = {
            disciplesPrograms:[],
            title:"",
            description:"",
            duration:"",
            location:"",
            price:null,
            year:"",
            image:"",
            link:"",
            // disciplesPrograms: [],
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
            linkundo:'', 
            loading:true,
            disciplesPrograms2:[],
          };
          
        
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
   .then(res => this.setState({ disciplesPrograms: [...this.state.disciplesPrograms, res.data.data] }));
  //  .then(res => this.setState({ disciplesPrograms: res.data.data }))
  // this.setState({updated:true});
  });
  //this.setState({updated:true});
  

}
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
       
        const headerStyle = {
 
          color: '#B6B6B6',
          textShadow: '2px 2px #FFDA00',
          textAlign: 'center',
         // padding: '55px',
          postion:'fixed',
          left: '0',
          width:'100%',
          lineHeight: '1',
          fontWeight: 'bold',
          fontSize:'60px'
        }
        const auth = this.props.usertype === "TIQadmin";
        if (auth) {
        return (
          <>
          <div style={this.getStyle()}  >
        <div>
        <ToolbarOUT/>
        <input 
                  type="Submit" 
                  value="Back"
                  className="btn"
                 onClick={() => {
                  this.handleClick();
                }}
                style={{ position: "absolute", left: "20px", top: "63px" }}

      />
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
             
        <Grid item xs={12}>
        <input
                 type="text"
                 name="link" 
                 style={{flex: '10' , padding: '5px',color:"black"}}
                 placeholder="Form link"
                 value={this.state.link}
                 onChange={this.onChange}
                 />
                 <br></br> <br></br>
                 <h style={{fontWeight:"bold",opacity:"1",left:"44%",position:'relative',color:"black"}}>
                   Disciples Program Image
                 </h>
                 <br></br> 
                  <input 
               id="file-input"
               accept=".jpg,.png"
               type="file" 
               onChange={this.onChange1.bind(this)} 
               color="black"
               style={{opacity:"1",left:"43%",position:'relative',color:"black"}}
               
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
            <h1 style={headerStyle}> Manage old Disciples Programs</h1>
          
        </div>
        <DisciplesPrograms disciplesPrograms={this.state.disciplesPrograms}
             delDisciplesProgram={this.delDisciplesProgram} addDisciplesProgram={this.addDisciplesProgram}
            updateDisciplesProgram={this.updateDisciplesProgram}
           />
            
          {this.state.deleted && <DelSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.updated && <UpdateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.created && <CreateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          <br></br><br></br><br></br>
          <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div>
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>
        </>
        )
      }
    }
}
const Form = connect(
  mapStateToProps,
  null
)(createDisciple);

export default Form;
