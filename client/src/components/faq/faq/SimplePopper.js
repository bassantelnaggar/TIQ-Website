import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import orange from'@material-ui/core/colors/orange';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },

}
);

class SimplePopper extends React.Component {
  state = {
    question:this.props.faq.question,
    answer:this.props.faq.answer,
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };
  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
           <button
            className="button"
             background = "#202024"
            onClick={this.handleClick}
            style={{marginLeft:"550px"}}
          >
           EDIT 
          </button>
      <br></br>
      <Popper id={id} open={open} anchorEl={anchorEl} style={{paddingLeft:'80px'}} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{backgroundColor:'#bdbdbd',padding:'10px 10px 10px 10px'}}>
            <form>
                <label>
                    <input
                       type="text"
                       placeholder="Edit Question ..."
                        name='question'
                        value={this.state.question}
                        style={{backgroundColor:'#efefef', padding: "5px",width:'300px' }}
                        onChange={this.onChange}
                        />
                </label>
                <label>
                    <input 
                        type="text"
                        name='answer'
                        value={this.state.answer} 
                        style={{ flex: "5", padding: "5px",backgroundColor:'#efefef', width:'300px'}}
                        placeholder="Edit Answer ..."
                        onChange={this.onChange}
                        />
                </label>
               
            </form>
            <button
            className="button"
             background = "#202024"
             onClick={this.props.updatefaq.bind(this,this.props.faq._id,this.state.question,this.state.answer)}
          >
           Update 
          </button>
          {"    "}
          <button
            className="button"
             background = "#202024"
             onClick={this.props.delfaq.bind(this,this.props.faq._id,this.props.faq.question,this.props.faq.answer)}
      
          >
           Delete 
          </button>
            

            
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
    );
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};
const btnStyle = {
  background: '#5ec0b6',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  textalign: 'center',
  textdecoration: 'none',
  display: 'inline-block',
  fontsize: '16px',
  borderradius: '12px'
}
const btnStyle2 = {
  background: '#',
  color: 'black',
  border: 'none',
  padding: '5px 10px',
  textalign: 'center',
  textdecoration: 'none',
  display: 'inline-block',
  fontsize: '16px',
  borderradius: '12px'
}
const edit={
  backgroundColor:'#5ec0b6' ,
  marginBottom:'9px'
}

export default withStyles(styles)(SimplePopper);
