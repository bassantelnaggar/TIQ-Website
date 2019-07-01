import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";

const types=[{

  value: 'member',
  label: 'Member',
},
{
  value: 'alumni',
  label: 'Alumni',
},
{
  value: 'disciple',
  label: 'Disciple',
},
{
  value: 'parent',
  label: 'Parent',
},];
const status=["House Leader","BOA","Supervisor","Disciples House Leader"]
const houses=["Pegasus","Orion","Neutral"];
const supervisor=["Marketing","Fundraising","Logistics","Relations","Media Design"]
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

class FormDialog extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      din: this.props.user.din,
      dor: this.props.user.dor,
      house: this.props.user.house,
      Error: "",
      tiqStatus:this.props.user.tiqStatus,
      supervisorType:this.props.user.supervisorType,
      score:this.props.user.score,
      type:this.props.user.type

    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleUpdateClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = () => {
    axios
      .put("/api/Users/update/" + this.props.user._id, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        bio: this.state.bio,
        birthDate: this.state.birthDate,
        clubs: this.state.clubs,
        din: this.state.din,
        dor: this.state.dor
      })
      .then(res => console.log(res))
      .catch(err => console.log(err.message));
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
   const { classes } = this.props;

    return (

      <div>
        <div />
        <EditIcon variant="outlined" onClick={this.handleClickOpen}>
          UPDATE
        </EditIcon>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle class="form-dialog-title ">Update Profile</DialogTitle>
          <DialogContent>
          {this.props.user.type=="member" &&<div>
              {/* member */}
              <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField 
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="din"> </InputLabel>
              <TextField 
                id="date"
                label="Date Of Joining"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="din"
                variant="outlined"

              />
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="tiqStatus"> </InputLabel>
                <TextField 
                id="standard-select-currency"
                select
                className={classes.textField}
                name="tiqStatus"
                label="TIQ Status"
                value={this.state.tiqStatus}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your TIQ Status"
                margin="normal"
                variant="outlined"
              >
                {status.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="supervisorType"></InputLabel>
              <TextField 
                id="standard-select-currency"
                select
                className={classes.textField}
                name="supervisorType"
                label="Supervisor Type"
                value={this.state.supervisorType}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your Supervisor Type"
                margin="normal"
                variant="outlined"
              >
                {supervisor.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="score">Score</InputLabel>
              <Input
                id="score"
                name="score"
                onChange={this.onChange}
                value={this.state.score}
                autoFocus
              />
            </FormControl>
            
            </div>}
            {this.props.user.type=="alumni" && <div>              {/* alumni */}
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField 
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="din"> </InputLabel>
              <TextField required
                id="date"
                label="Date Of Joining"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="din"
                variant="outlined"

              />
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="dor"> </InputLabel>
              <TextField required
                id="date"
                label="Date Of Leaving"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="dor"   
                variant="outlined"
         
                  />
            </FormControl>

            </div>}
            {this.props.user.type=="disciple" && <div>
              {/* disciples */}
              <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
      </TextField>
            </FormControl>

            </div>}
 
            <Typography paragraph>{this.state.Error}</Typography> */}
          </DialogContent>
          <DialogActions>
            <Button
              // variant="outlined"
              // color="primary"
              class="Form-Dialo-Button"
              onClick={this.handleClose}
            >
              CANCEL
            </Button>
            <Button  onClick={this.props.update.bind(this,this.props.user._id,this.state.type,this.state.house,this.state.din,this.state.dor,this.state.tiqStatus,this.state.supervisorType,this.state.score)} color="black">
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      // </main>

    );
  }
}
  FormDialog.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(FormDialog);