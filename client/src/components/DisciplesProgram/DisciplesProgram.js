import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import DisciplesPrograms from './DisciplesPrograms';
import axios from 'axios';
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import AddDisciplesProgram from './AddDisciplesProgram';
import SimplePopper from './SimplePopper';
import UpdateSimpleSnackbar from './UpdateSimpleSnackbar.';
import CreateSimpleSnackbar from './CreateSimpleSnackbar';
import DelSimpleSnackbar from './DelSimpleSnackbar';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import img from "../../pages/Homee/images/tb.png"
import img2 from "../../pages/Homee/images/pic18.jpg"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { fontSize } from '@material-ui/system';
import { connect } from "react-redux";
import "../users/profile.css"

var ReactCSSTransitionGroup =  CSSTransitionGroup
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
const useStyles =theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    
  },
  gridList: {
    width: 50,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    opacity: '100%'
     
  },
  icon: {
    color: 'white',
    
  
  }
 
});
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
      linkundo:'', 
      loading:true,
      disciplesPrograms2:[],
      
}



   componentDidMount() {
    axios.get('api/DisciplesProgram')
      .then(res =>{ 
        console.log(res.data)
        this.setState({ disciplesPrograms: res.data.data, loading:false })
        // res.data.data.shift()
        // this.setState({disciplesPrograms2:res.data.data})
        // console.log(this.state.disciplesPrograms2)
      }
    ).catch(err=>{
      console.log(err)
    })
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
     .then(res => this.setState({ disciplesPrograms: res.data.data }))
     this.setState({updated:true});
    });
    this.setState({updated:true});

}
handleClickME =() => {
  this.props.history.push("/createdisciplePage");
};

  render() {
    const classes = useStyles;
    if (this.props.token === null) {
    return (
      
        
        <div className="App">
        <Toolbar/>
          {/* <div>
         
        <SimplePopper addDisciplesProgram={this.addDisciplesProgram} undo={this.undo}/>
        <br></br>
            <DisciplesPrograms disciplesPrograms={this.state.disciplesPrograms}
             delDisciplesProgram={this.delDisciplesProgram} addDisciplesProgram={this.addDisciplesProgram}
            updateDisciplesProgram={this.updateDisciplesProgram} />
      
          </div>  
          {this.state.deleted && <DelSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.updated && <UpdateSimpleSnackbar change1={this.change1} undo={this.undo} /> }
          {this.state.created && <CreateSimpleSnackbar change1={this.change1} undo={this.undo} /> } */}
          
        </div>
      
    );
    }
    else if(!this.state.loading){
      return (
        <div>
        <div>
            <ToolbarOUT />
          </div>
          {/* <div class="carousel" className="noselect">
                <div className="arrow arrow-left" onClick={this.leftClick}><i className="fi-arrow-left"></i></div>
                <ReactCSSTransitionGroup 
                    transitionName={this.state.direction}>
                        {this.state.disciplesPrograms.map(disciplesProgram => (
                  
                <div class="card" style={{ opacity: "", backgroundImage: `url(${img})`,display:"fit",  backgroundRepeat:"no-repeat"
                ,backgroundSize:"100% 100%" }}>
{                
                      <h3>{disciplesProgram.title}</h3>
                   <p>{disciplesProgram.year} </p> 
          
                </div>
              ))}
                   
                </ReactCSSTransitionGroup>
                <div className="arrow arrow-right" onClick={this.rightClick}><i className="fi-arrow-right"></i></div>
            </div>

 */}


           <div class="inner"style={{height:"100%"}}>
            <div class="thumbnails"style={{width:"100%",height:"70%"}} >
              {this.state.disciplesPrograms.map(disciplesProgram => (
                <div class="box" style={{ opacity: "", backgroundImage: `url(${img})`,display:"fit",  backgroundRepeat:"no-repeat"
                ,backgroundSize:"100% 100%" }}>
                
                      <h3>{disciplesProgram.title}</h3>
                    <p>{disciplesProgram.year} </p>
                 
              
                
                  <div class="inner">
                    </div>
                    <div class="inner">
                    </div>
                    <div class="inner">
                    </div> 
                     <div class="inner">
                    </div>
                   
                   
                 
                </div>
              ))}
            </div>
          </div> 
          </div>
  
    );
    }
    else return(
      <div>
        Eh ba2a
      </div>
    )

  }

}

// const Form = connect(
//   mapStateToProps,
//   null
// )(makeStyles(useStyles)(DisciplesProgram));
export default DisciplesProgram;
