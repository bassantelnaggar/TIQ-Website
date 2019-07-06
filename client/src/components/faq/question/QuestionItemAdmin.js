import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const styles = theme => ({
  root: {
    width: '50%',
    postion:"center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});
export class QuestionItemAdmin extends Component {
  state = {
    expanded: null,
    question: '',
    answer:''
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

onChange= (e) => this.setState({[e.target.name]: e.target.value});
handleClick = event => {
  let path = `/userquestions`;
  this.props.history.push(path);
 
};



  render() {
    
   const { _id,question} = this.props.question;
   const { classes } = this.props;
   const { expanded } = this.state;
    return (
  
        <div className={classes.root} style={{marginLeft:"380px"}} >
          <ExpansionPanel  style={expanded?panelStyle:panelStyle} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            < >
              <Typography className={classes.heading} style={expanded?questionOpen:questionOpen} > <br></br>{"Question: "}<q style={{color:"black"}}>{question}</q> 
              <br></br><br></br><br></br>
              <form>
              <label>
                    <input 
                        type="text"
                        name='answer'
                        value={this.state.answer} 
                        placeholder="Add Answer ..."
                        style={{backgroundColor:'#efefef'}}
                        onChange={this.onChange}/>

                </label>
            </form>
            </Typography>
            <button
            className="button"
             background = "#202024"
             onClick={this.props.answerQuestion.bind(this,_id,this.state.answer)} 
            style={{marginLeft:"360px"}}
          >
           Answer 
          </button> 
          {"     "}
            <button
            className="button"
             background = "#202024"
             onClick={this.props.delQuestion.bind(this,this.props.question._id)}
      
          >
           Delete 
          </button> 
              <br></br><br></br>
            </>
          
           </ExpansionPanel>
           
           </div>
     
      )
      // <div >
      //   <p style={questionStyle}>
      //       { question }
      //       <br></br>
      //   </p>
      //       <form>
                
            //     <label>
            //         <input 
            //             type="text"
            //             name='answer'
            //             value={this.state.answer} 
            //             placeholder="Add Answer ..."
            //             style={{backgroundColor:'#efefef'}}
            //             onChange={this.onChange}/>

            //     </label>
                
            // </form>
      //       <button    onClick={this.props.answerQuestion.bind(this,_id,this.state.answer)} >Answer</button>
           
          
      //     <IconButton className={"classes"} aria-label="Delete"  onClick={this.props.delQuestion.bind(this,this.props.question._id)}>
      //     <DeleteIcon/> 
      //     </IconButton>
      // </div>
   
  }
}

const questionOpen={
  textTransform: 'uppercase',
  lineheight: '0.8',
  color:'#5b5f61',
  lineHeight:'1',
  fontSize:'17px',
  fontWeight:'bold',
  padding:"10px",
  fontFamily:'Sanserif'

  
}
const questionStyle={
    textTransform: 'uppercase',
    lineheight: '0.8',
    color:'black',
    lineHeight:'1',
    fontSize:'17px',
    fontFamily:'Sanserif'

  
  }
  const answerStyle={
    textTransform: 'capitalize',
    color:'#6d7173',
    lineHeight:'1',
    fontFamily:'Sanserif'
  
  
  }
  const panelStyle={
    borderLeft:'20px solid #B83126',
    background:'#e0e0e0'
  }
  const panel2Style={
    borderLeft:'20px solid #FFDA00',
    background:'#eeeeee'
  }
  const style={
    // background:"#31383d"
    background:"#F0F0F0",
    boxShadow: '2px 2px 4px #000000b3' ,

  }

  QuestionItemAdmin.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(QuestionItemAdmin);
// export default FaqItem
// export default QuestionItemAdmin