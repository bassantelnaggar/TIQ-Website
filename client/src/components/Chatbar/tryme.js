import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Toolbarr from "../../layout/Toolbar/Toolbar";
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

//import "./Chatbars.css"
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
const styles = theme => ({
  root: {
    width:'80%',
    flexGrow: 1,
    marginLeft:'10%',
    loaded:false
  }
});

class tryme extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      chatbars: [],
      forResponses_: [],
      againstResponses_: [],
      forResponses: '',
      againstResponses: '',
      user:{}
    };
  } 
  state = {
    expanded: null,
    expanded2: null,
    expanded3: null
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    
  this.setState({ againstResponses: ''});
  this.setState({ forResponses: ''});
  };
  componentDidMount() {
    const id = this.props.match.params.key;
    axios.get('/api/Users/'+ this.props.id)
    .then(user=>this.setState({user : user.data.data},()=>console.log("fetched",user.data.data)))
    .catch(console.log('cannot fetch'))
    fetch("/api/Chatbars/" + id)
      .then(res => res.json())
      .then(chatbars =>
        this.setState({ chatbars: chatbars }, () =>
          console.log("chatbars fetched...", chatbars)
        )
      );
    fetch("/api/Chatbars/getAllForResponses/" + id)
      .then(res => res.json())
      .then(forResponses_ =>
        this.setState({ forResponses_: forResponses_ }, () =>
          console.log("chatbars fetched...", forResponses_)
        )
      );
    fetch("/api/Chatbars/getAllAgainstResponses/" + id)
      .then(res => res.json())
      .then(againstResponses_ =>
        this.setState({ againstResponses_: againstResponses_ ,loaded:true}
        )
      );
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  handleChange2 = panel => (event, expanded2) => {
    this.setState({
      expanded2: expanded2 ? panel : false,
    });
  };
  handleChange3 = panel => (event, expanded3) => {
    this.setState({
      expanded3: expanded3 ? panel : false,
    });
  };
 
  addForResponse(chatbar) {
    const updatedData = {};
    if (chatbar.forResponses !== "")
      updatedData.forResponses = chatbar.forResponses;

    axios.put(
      " /api/Chatbars/for/" + this.props.match.params.key,
      {
        forResponses: chatbar.forResponses
      }
    ).then(res => this.setState({ forResponses_: [...this.state.forResponses_, res.data.data] }));
  //  alert("Added successfully!");;
  }
  addAgainstResponse(chatbar) {
    const updatedData = {};
    if (chatbar.againstResponses !== "")
      updatedData.againstResponses = chatbar.againstResponses;

    axios.put(
      " /api/Chatbars/against/" +
        this.props.match.params.key,
      {
        againstResponses: chatbar.againstResponses
      }
    )    .then(res => this.setState({ againstResponses_: [...this.state.againstResponses_, res.data.data] }));

  }
  

  render() {
    if (this.props.token === null) {
      return (
        <div>
        <Toolbarr/>
        <div class="thumbnails">
          <div class="box">
            <div class="inner">
              <h3>You have to sign in first!</h3>
             
              <button
                variant="contained"
                onClick={() => {
                  this.handleClick();
                }}
                //onClick={() => (document.location = "/signin")}
                className="btn"
              >
                Sign In
              </button>
              
            </div>
          </div>
        </div>
        <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
        <div >
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
    if(!this.state.loaded){
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
    const { classes } = this.props;
    const { expanded } = this.state;
    const { expanded2 } = this.state;
    const { expanded3 } = this.state;
    const headerStyle = {
 
      color: '#191b1c',
      textAlign: 'center',
       //padding: '30px',
      position: "absolute", top: "75px",
      left: '0',
      width:'100%',
      lineHeight: '1',
      fontWeight: 'bold',
      // textShadow: '2px 2px 4px #000000b3',
      fontSize:'70px',
      
    }
    return (
    <>
      <div className={classes.root} >
          <ToolbarOUT />
          <p style={headerStyle} >  {this.state.chatbars.debateLiveTitle}</p>
          <div style={{position:"relative",top:"90px"}}>
        <Grid container spacing={3}>  
        <Grid item xs>
       
             
        <AppBar position="static" style={{background:'#145A32',opacity:"50%"}}>
        <Toolbar variant="transparent" >
          <Typography variant="h6" color="inherit">
            FOR RESPONSES
          </Typography>
          
        </Toolbar>
      </AppBar>
        {this.state.forResponses_.map(forResponse => (
        <ExpansionPanel style={expanded?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary >
            <Typography className={classes.heading} style={expanded3?responseOpen:responseStyle} >
            <q style={{fontWeight: 'bold',fontFamily:"Raleway"}}>{forResponse[0]+":"} </q> <q style={{fontFamily:"Raleway"}}>{forResponse[1]}</q>  </Typography>
          </ExpansionPanelSummary>
          </ExpansionPanel>
        
          
        ))}
         <ExpansionPanel style={expanded?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary >
            <Typography className={classes.heading} style={expanded3?responseOpen:responseStyle} > 
            <form onSubmit={this.onSubmit} >
            <textarea
                type="text"
                name="forResponses"
                style={{
                  // flex: "10",
                  // padding: "5px",
                  //position: "fixed",
                  width: "540px",
                  // bottom: "2px",
                  color: "black"
                }}
                placeholder="Write your response here if you are with..."
                value={this.state.forResponses}
                onChange={this.onChange}
              />
              <br></br>
              <input
                type="Submit"
                value="Submit"
                className="btn"
                style={{marginLeft:'390px'}}
                onClick={this.addForResponse.bind(this, {
                  _id: this.props.match.params.key,
                  forResponses:[ this.state.user.firstName +" "+ this.state.user.lastName ,this.state.forResponses]
                })}
              />
              </form>
            </Typography>
          </ExpansionPanelSummary>
          </ExpansionPanel>
       
        </Grid>
        <Grid item xs>
        <AppBar position="static"style={{background:'#800000',opacity:"50%"}}>
        <Toolbar variant="transparent" >
          <Typography variant="h6" color="inherit" >
            AGAINST RESPONSES
          </Typography>
        </Toolbar>
      </AppBar>
        {this.state.againstResponses_.map(againstResponse => (
         

          <ExpansionPanel style={expanded2?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary >
              <Typography className={classes.heading} style={expanded2?responseOpen:responseStyle} >
              <q style={{fontWeight: 'bold',fontFamily:"Raleway"}}> {againstResponse[0]+":"}</q> <q style={{fontFamily:"Raleway"}}>{againstResponse[1]} </q> </Typography>
            </ExpansionPanelSummary>
           </ExpansionPanel>
           ))}
           <ExpansionPanel style={expanded2?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary >
              <Typography className={classes.heading} style={expanded2?responseOpen:responseStyle}  > 
              <form onSubmit={this.onSubmit} >
              <textarea 
                type="text"
                name="againstResponses"
                style={{
                  // flex: "10",
                  // padding: "5px",
                  //position: "fixed",
                  width: "540px",
                  // bottom: "2px",
                  color: "black"
                 
                }}
                placeholder="Write your response here if you are against..."
                value={this.state.againstResponses}
               
                onChange={this.onChange}
              />
               <br></br>
              
              <input
                type="Submit"
                value="Submit"
                className="btn"
                style={{marginLeft:'390px'}}
                onClick={this.addAgainstResponse.bind(this, {
                  _id: this.props.match.params.key,
                  againstResponses: [this.state.user.firstName +" "+ this.state.user.lastName , this.state.againstResponses]
                })}
               
               
              /> </form>
              </Typography>
               
            </ExpansionPanelSummary>
           </ExpansionPanel>
          
          
        </Grid>
        
      </Grid>
        
         
         </div>
         
         </div>
         <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div >
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

);
  }}
}
const responseOpen={
 
  // lineheight: '0.8',
  width: 'auto',
  // color:'#black',
  // lineHeight:'1',
  // fontSize:'17px',
  // fontWeight:'bold',
  fontFamily:'Sanserif',
 

  
}
const responseStyle={
  
    // lineheight: '0.8',
    // color:'#black',
    // lineHeight:'1',
    width: 'auto',
    fontSize:'17px',
    fontFamily:'Sanserif',
  


  }
 
  const panelStyle={
    // borderLeft:'20px solid #410c12',
    background:'#F6F5F5'
  }
  const panel2Style={
    borderLeft:'20px solid #410c12',
    background:'#F6F5F5'
  }
  const style={
    background:"#F6F5F5"
  }
  tryme.propTypes = {
  classes: PropTypes.object.isRequired,
};


const Form = connect(
  mapStateToProps,
  null
)( withStyles(styles)(tryme));

export default Form;
