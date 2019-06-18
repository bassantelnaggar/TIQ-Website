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
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
const styles = theme => ({
  root: {
    width:'100%',
    flexGrow: 1,
  }
});

class tryme extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      chatbars: [],
      forResponses_: [],
      againstResponses_: [],
      forResponses: "",
      againstResponses: "",
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
    // this.setState(this.state.debateLiveTitle);

    this.setState({ forResponses: "" });
    this.setState({ againstResponses: "" });
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
        this.setState({ againstResponses_: againstResponses_ }, () =>
          console.log("chatbars fetched...", againstResponses_)
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
        forResponses: [chatbar.forResponses]
      }
    ).then(res => this.setState({ forResponses_: [...this.state.forResponses_, res.data.data] }));
    alert("Added successfully!");;
  }
  addAgainstResponse(chatbar) {
    const updatedData = {};
    if (chatbar.againstResponses !== "")
      updatedData.againstResponses = chatbar.againstResponses;

    axios.put(
      " /api/Chatbars/against/" +
        this.props.match.params.key,
      {
        againstResponses: [chatbar.againstResponses]
      }
    )    .then(res => this.setState({ againstResponses_: [...this.state.againstResponses_, res.data.data] }));

  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const { expanded2 } = this.state;
    const { expanded3 } = this.state;
    const headerStyle = {
 
      color: '#191b1c',
      textAlign: 'center',
      // padding: '40px',
      position: "absolute", top: "65px",
      left: '0',
      width:'100%',
      lineHeight: '1',
      fontWeight: 'bold',
      fontSize:'40px'
    }
    return (
    
      <div className={classes.root} >
          <Toolbarr />
          <p style={headerStyle}>  {this.state.chatbars.debateLiveTitle}</p>
          <div style={{position:"relative",top:"-45px"}}>
        <Grid container spacing={3}>  
        <Grid item xs>
        <AppBar position="static" style={{background:'#145A32'}}>
        <Toolbar variant="transparent" >
          <Typography variant="h6" color="inherit">
            FOR RESPONSES
          </Typography>
          
        </Toolbar>
      </AppBar>
        {this.state.forResponses_.map(forResponse => (
        <ExpansionPanel style={expanded?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary >
            <Typography className={classes.heading} style={expanded3?responseOpen:responseStyle} > {forResponse} </Typography>
          </ExpansionPanelSummary>
          </ExpansionPanel>
        
         
        ))}
         <br></br>
        <textarea
                type="text"
                name="forResponses"
                style={{
                  // flex: "10",
                  // padding: "5px",
                  //position: "fixed",
                  // width: "50%",
                  // bottom: "2px",
                  color: "black"
                }}
                placeholder="Write your response here if you are with..."
                value={this.state.forResponses}
                onChange={this.onChange}
              />
              
              <input
                type="Submit"
                value="Submit"
                className="btn"
                onClick={this.addForResponse.bind(this, {
                  _id: this.props.match.params.key,
                  forResponses: this.state.user.firstName +" "+ this.state.user.lastName+" : " +this.state.forResponses
                })}
            
               
              />
        </Grid>
        <Grid item xs>
        <AppBar position="static"style={{background:'#1F618D'}}>
        <Toolbar variant="transparent"  >
          <Typography variant="h6" color="inherit">
            AGAINST RESPONSES
          </Typography>
        </Toolbar>
      </AppBar>
        {this.state.againstResponses_.map(againstResponse => (
         

          <ExpansionPanel style={expanded2?panelStyle:style} expanded3={expanded3 === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary >
              <Typography className={classes.heading} style={expanded2?responseOpen:responseStyle} > {againstResponse} </Typography>
            </ExpansionPanelSummary>
           </ExpansionPanel>
           ))}
           <br></br>
           <textarea
                type="text"
                name="againstResponses"
                style={{
                  // flex: "10",
                  // padding: "5px",
                  // position: "fixed",
                  // width: "50%",
                  // bottom: "2px",
                  color: "black"
                }}
                placeholder="Write your response here if you are against..."
                value={this.state.againstResponses}
                onChange={this.onChange}
              />
              <input
                type="Submit"
                value="Submit"
                className="btn"
                onClick={this.addAgainstResponse.bind(this, {
                  _id: this.props.match.params.key,
                  againstResponses: this.state.user.firstName +" "+ this.state.user.lastName +" : "+ this.state.againstResponses
                })}
               
              />
        </Grid>
        
      </Grid>
        
         
         </div>
         </div>

);
  }
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
    background:'#e0e0e0'
  }
  const panel2Style={
    borderLeft:'20px solid #410c12',
    background:'#e0e0e0'
  }
  const style={
    background:"#eeeeee"
  }
  tryme.propTypes = {
  classes: PropTypes.object.isRequired,
};


const Form = connect(
  mapStateToProps,
  null
)( withStyles(styles)(tryme));

export default Form;
