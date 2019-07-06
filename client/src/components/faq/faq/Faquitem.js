import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    
    width: '110%',
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

class FaqUItem extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { _id,question,answer} = this.props.faq;

    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root} style={{marginLeft:"160px"}} >
        <ExpansionPanel style={{}} style={expanded?panelStyle:style} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading} style={expanded?questionOpen:questionStyle} >{question}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={expanded?panel2Style:null}>
            <Typography style={answerStyle}>
              {answer}
            </Typography>
          </ExpansionPanelDetails>
         </ExpansionPanel>
         
         </div>


);
  }
}
const questionOpen={
  textTransform: 'uppercase',
  lineheight: '0.8',
  color:'#5b5f61',
  lineHeight:'1',
  fontSize:'17px',
  fontWeight:'bold',
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
  FaqUItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FaqUItem);


