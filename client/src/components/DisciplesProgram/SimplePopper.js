import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import AddDisciplesProgram from './AddDisciplesProgram';
import SimpleSnackbar from './SimpleSnackbar'


class sp extends React.Component {
  

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };
state={
  anchorEl: null,
    open: false,
    Snackbar:false
  };
  change= () => {     this.setState(state => ({
    open: !state.open,
    Snackbar:!state.Snackbar
  }));}
  change1= () => {     this.setState(state => ({
    Snackbar:!state.Snackbar
  }));}
  undo= () => {    this.props.undo();
  }

  render(){
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
        Create New Disciples Program
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
            <AddDisciplesProgram  addDisciplesProgram={this.addDisciplesProgram} change={this.change} />

            </Paper>
          </Fade>
        )}
      </Popper>

    </div>
  );
}}
export default sp;