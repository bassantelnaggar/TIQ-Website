import React, { Component } from 'react';
import axios from 'axios';
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import img2 from "../../pages/Homee/images/pic18.jpg"
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import "../users/profile.css"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from "react-redux";


const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

const useStyles = theme => ({
  root: {
    width: '100%',
     postion: "relative",
     left:"20%",
   
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
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
      loaded:false

      
}



   componentDidMount() {
    axios.get('api/DisciplesProgram')
      .then(res =>{ 
        console.log(res.data)
        this.setState({ disciplesPrograms: res.data.data, loaded:true })
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
    
    const headerStyle = {
 
      color: '#FFDA00',
      textShadow: '2px 2px #B83126',
      textAlign: 'left',
      padding: '55px',
      postion:'fixed',
      left: '0',
      width:'100%',
      lineHeight: '1',
      fontWeight: 'bold',
      fontSize:'60px'
    }
    const bodyStyle = {
 
      color: 'black',
      textAlign: 'left',
      padding: '150px',
      postion:'fixed',
      marginTop:'-230px',
      marginLeft:'-90px',
      // left: '0',
      //textmargin:'100px',
      fontWeight: 'bold',
      width:'100%',
      fontSize:'20px'
    }
    const headerStyle2 = {
 
      color: '#FFDA00',
      textShadow: '2px 2px #B83126',
      textAlign: 'left',
      // padding: '55px',
      postion:'fixed',
      marginTop:'-150px',
      marginLeft:'65px',
     
      lineHeight: '1',
      fontWeight: 'bold',
      fontSize:'60px'
    }
  const classes = useStyles;
  const auth = this.props.usertype === "TIQadmin";
  if(!this.state.loaded&&(this.props.token === null)){
    return (
      <>
      <Toolbar />
      <div style={{position: 'fixed',top: '50%',left: '50%'}}>
    <CircularProgress/>
    </div>
    </>
    )
  }
  else{
    if(!this.state.loaded&&!(this.props.token === null)){
    return (
      <>
      <ToolbarOUT />
     
      <div style={{position: 'fixed',top: '50%',left: '50%'}}>
    <CircularProgress/>
    </div>
    </>
    )
    }
  else{
  if (this.props.token === null) { 
    return (
      <div className={classes.root}>
      <div>
          <Toolbar/>
        </div>
        <h1 style={headerStyle}> What's the Disciples Program ?</h1>
        <p style={bodyStyle}>The Disciples Program (subsidiary of The Intelligent Question) 
          is the 1st debating program in Egypt dedicated to high school students.
           Founded in 2016, it offers school students in Egypt 
           the chance to learn the semantics of a debate, the basics of argumentation,
          and the World Style Debate format that is adopted in World Universities Debating
           Championships (WUDC). The Disciples program’s main academic objective is to provide
            the students with an understanding of how a good debate goes. This includes
             understanding what an argument is, being able to evaluate an argument’s validity, 
             deconstructing invalid arguments, as well as learning how to structure a speech and 
             being able to present the arguments in an appealing manner. All roads lead to learning 
             the World Style Debate format that is used in World Universities Debating Championships.</p>
             <h1 style={headerStyle2}> OUR Disciples Programs</h1>
             {this.state.disciplesPrograms.map(disciplesProgram => (
    <ExpansionPanel style={{ backgroundColor:"#F0F0F0", width:"50%",postion: "relative", marginLeft:'130px',boxShadow: '2px 2px 4px #000000b3'}}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading} style={{fontWeight:"bold",fontSize:"30px"}}>{disciplesProgram.title} </Typography>
         <Typography className={classes.secondaryHeading}> {disciplesProgram.year}</Typography>
        </div> 
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column} />
        <div className={classes.column}>
        <img src={disciplesProgram.image} class="image fit"/>
          <p style={answerStyle}>
          <q style={{fontWeight:"bold"}}> {"Description: "} </q> {disciplesProgram.description}
        
      </p> 
      <p style={answerStyle}>
     <q style={{fontWeight:"bold"}}> {"Duration: "} </q> {disciplesProgram.duration}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Location: "} </q>    {disciplesProgram.location}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Price: "} </q>{disciplesProgram.price}
        
      </p> 
        </div>
        <div className={clsx(classes.column, classes.helper)}>
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
      <a href={disciplesProgram.link}  className="button">Register Now!</a> 
       
      </ExpansionPanelActions>
    </ExpansionPanel>
            ))}
    <br></br> <br></br> <br></br>
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
        </div>

  );
  
  }
  else{
    const auth = this.props.usertype === "TIQadmin";
        if (auth) {
    return (
      <div className={classes.root}>
      <div>
          <ToolbarOUT />
        </div>
        <button
          className="button"
           background = "#202024"
          style={{ position: "absolute", left: "20px", top: "61px" }}
          onClick={() => {
            this.handleClickME();
          }}
        >
          Manage Disciples Programs
        </button>

        <h1 style={headerStyle}> What's the Disciples Program ?</h1>
        <p style={bodyStyle}>The Disciples Program (subsidiary of The Intelligent Question) 
          is the 1st debating program in Egypt dedicated to high school students.
           Founded in 2016, it offers school students in Egypt 
           the chance to learn the semantics of a debate, the basics of argumentation,
          and the World Style Debate format that is adopted in World Universities Debating
           Championships (WUDC). The Disciples program’s main academic objective is to provide
            the students with an understanding of how a good debate goes. This includes
             understanding what an argument is, being able to evaluate an argument’s validity, 
             deconstructing invalid arguments, as well as learning how to structure a speech and 
             being able to present the arguments in an appealing manner. All roads lead to learning 
             the World Style Debate format that is used in World Universities Debating Championships.</p>
             <h1 style={headerStyle2}> OUR Disciples Programs</h1>
             {this.state.disciplesPrograms.map(disciplesProgram => (
    <ExpansionPanel style={{ backgroundColor:"#F0F0F0", width:"50%",postion: "relative", marginLeft:'130px',boxShadow: '2px 2px 4px #000000b3'}}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading} style={{fontWeight:"bold",fontSize:"30px"}}>{disciplesProgram.title} </Typography>
         <Typography className={classes.secondaryHeading}> { "2019" }</Typography>
        </div> 
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column} />
        <div className={classes.column}>
          <img src={disciplesProgram.image} class="image fit"/>
          <p style={answerStyle}>
          <q style={{fontWeight:"bold"}}> {"Description: "} </q> {disciplesProgram.description}
        
      </p> 
      <p style={answerStyle}>
     <q style={{fontWeight:"bold"}}> {"Duration: "} </q> {disciplesProgram.duration}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Location: "} </q>    {disciplesProgram.location}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Price: "} </q>{disciplesProgram.price}
        
      </p> 
      
     
        </div>
        <div className={clsx(classes.column, classes.helper)}>
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
      <a href={disciplesProgram.link}  className="button">Register Now!</a> 
      </ExpansionPanelActions>
    </ExpansionPanel>
            ))}
    <br></br> <br></br> <br></br>
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
        </div>

  );
  
             }
             else{
              return (
                <div className={classes.root}>
                <div>
                    <ToolbarOUT />
                  </div>
          
                  <h1 style={headerStyle}> What's the Disciples Program ?</h1>
                  <p style={bodyStyle}>The Disciples Program (subsidiary of The Intelligent Question) 
                    is the 1st debating program in Egypt dedicated to high school students.
                     Founded in 2016, it offers school students in Egypt 
                     the chance to learn the semantics of a debate, the basics of argumentation,
                    and the World Style Debate format that is adopted in World Universities Debating
                     Championships (WUDC). The Disciples program’s main academic objective is to provide
                      the students with an understanding of how a good debate goes. This includes
                       understanding what an argument is, being able to evaluate an argument’s validity, 
                       deconstructing invalid arguments, as well as learning how to structure a speech and 
                       being able to present the arguments in an appealing manner. All roads lead to learning 
                       the World Style Debate format that is used in World Universities Debating Championships.</p>
                       <h1 style={headerStyle2}> OUR Disciples Programs</h1>
                       {this.state.disciplesPrograms.map(disciplesProgram => (
              <ExpansionPanel style={{ backgroundColor:"#F0F0F0", width:"50%",postion: "relative", marginLeft:'130px',boxShadow: '2px 2px 4px #000000b3'}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading} style={{fontWeight:"bold",fontSize:"30px"}}>{disciplesProgram.title} </Typography>
                   <Typography className={classes.secondaryHeading}> {disciplesProgram.year}</Typography>
                  </div> 
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  <div className={classes.column} />
                  <div className={classes.column}>
                  <img src={disciplesProgram.image} class="image fit"/>
          <p style={answerStyle}>
          <q style={{fontWeight:"bold"}}> {"Description: "} </q> {disciplesProgram.description}
        
      </p> 
      <p style={answerStyle}>
     <q style={{fontWeight:"bold"}}> {"Duration: "} </q> {disciplesProgram.duration}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Location: "} </q>    {disciplesProgram.location}
        
      </p> 
      <p style={answerStyle}>
      <q style={{fontWeight:"bold"}}> {"Price: "} </q>{disciplesProgram.price}
        
      </p> 
                  </div>
                  <div className={clsx(classes.column, classes.helper)}>
                  </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                <a href={disciplesProgram.link}  className="button">Register Now!</a> 
                 
                </ExpansionPanelActions>
              </ExpansionPanel>
                      ))}
              <br></br> <br></br> <br></br>
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
                  </div>
          
            );
             }

  }
     
  }
  }}
}

const questionStyle={
  textTransform: 'uppercase',
  lineheight: '0.8',
  fontWeight:'bold',
  color:'#3e3939bf',
  lineHeight:'1',
  fontSize:'25px',

}
const answerStyle={
  textTransform: 'capitalize',
  color:'#6d7173',
  lineHeight:'1',
  fontSize:'20px',


}
const btnStyle = {
  background: '#333',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  textalign: 'center',
  textdecoration: 'none',
  display: 'inline-block',
  fontsize: '16px',
  borderradius: '12px'
}


const Form = connect(
  mapStateToProps,
  null
)(DisciplesProgram);
export default Form;
