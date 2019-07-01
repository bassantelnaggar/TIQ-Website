import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";

import axios from 'axios';
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

const useStyles = theme => ({
  root: {
    width: '100%',
    postion: "relative",
    left:"20%"
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


class SignedUpItem extends Component {
  
 render() {
  const classes = useStyles;

   const { _id,email,type,firstName,lastName,birthDate,bio,din,dor,house,tiqStatus,supervisorType} = this.props.signedUp;
    return (
      <div >
          <div className={classes.root}>
      <ExpansionPanel style={{width:"50%",postion: "relative",left:"25%",boxShadow: '2px 2px 4px #000000b3'}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading} style={{fontWeight:"bold"}}>{firstName} <q>{lastName}</q></Typography>
           <Typography className={classes.secondaryHeading}> { type }</Typography>
          </div> 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <p style={answerStyle}>
           Email: { email }
          
        </p> 
        <p style={answerStyle}>
           Type: { type }
       </p>   
       
        <p style={answerStyle}>
           Birthdate: { birthDate }
          
        </p> 
        <p style={answerStyle}>
          Bio:  { bio }
          
        </p> 
        <p style={answerStyle}>
           Date In: { din }
          
        </p> 
        <p style={answerStyle}>
           Date Out: { dor }
          
        </p> 
        <p style={answerStyle}>
            House: { house }
          
        </p> 
        <p style={answerStyle}>
           TIQ Status:  { tiqStatus }
          
        </p> 
        <p style={answerStyle}>
            Supervisor Type: { supervisorType }
          
        </p> 
          </div>
          <div className={clsx(classes.column, classes.helper)}>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <button  className="btn" style={btnStyle} onClick={this.props.accept.bind(this,_id)} >Accept</button>
          <button  className="btn" style={btnStyle} onClick={this.props.decline.bind(this,_id)} >Decline</button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
     
      </div>
    )
  }
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

//export default makeStyles(useStyles)(SignedUpItem);
export default SignedUpItem;