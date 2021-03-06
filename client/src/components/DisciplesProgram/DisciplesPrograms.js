import React, { Component } from 'react';
import DisciplesProgramItem from './DisciplesProgramItem';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
class DisciplesPrograms extends Component {
 
  render() {
    const classes = useStyles;
    return(
    
      <div class="thumbnails">
        {this.props.disciplesPrograms.map((disciplesProgram) => (
         <ExpansionPanel style={{ width:"50%",postion: "relative", marginLeft:'130px',boxShadow: '2px 2px 4px #000000b3'}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading} style={{fontWeight:"bold",fontSize:"20px"}}>{disciplesProgram.title} </Typography>
           <Typography className={classes.secondaryHeading}> {disciplesProgram.year} </Typography>
          </div> 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
          
      	<div >
        <div class="inner">
      <DisciplesProgramItem key={disciplesProgram._id} disciplesProgram={disciplesProgram} 
      delDisciplesProgram={this.props.delDisciplesProgram} 
      updateDisciplesProgram={this.props.updateDisciplesProgram} />
    </div>
							</div>
              
   
          </div>
          <div className={clsx(classes.column, classes.helper)}>
          </div>
        </ExpansionPanelDetails>

        
      </ExpansionPanel>
       ))}      
     
  
    </div>
    )
  }
}

// PropTypes
DisciplesPrograms.propTypes = {
  disciplesPrograms: PropTypes.array.isRequired }

export default DisciplesPrograms;