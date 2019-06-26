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

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      birthDate: this.props.user.birthDate,
      bio: this.props.user.bio,
      clubs: this.props.user.clubs,
      din: this.props.user.din,
      dor: this.props.user.dor,
      Error: ""
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

  render() {
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
            <DialogContentText />

            <TextField
              onChange={e => {
                this.setState({
                  type: e.target.value
                });
              }}
             // onChange={this.onChange}
              autoFocus

              margin="dense"
              id="FirstName"
              label="Type"
              type="Type"
              defaultValue={this.props.user.type}
            />

            <TextField
              onChange={e => {
                this.setState({
                  house: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="LastName"
              label="House"
              type="House"
              defaultValue={this.props.user.house}
            />

           
            <TextField
              onChange={e => {
                this.setState({
                  dor: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="bio"
              label="Date Out"
              type="Date Out"
              defaultValue={this.props.user.dor}
            />
            <TextField
              onChange={e => {
                this.setState({
                  din: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="din"
              label="din"
              type="din"
              defaultValue={this.props.user.din}
            />

            <TextField
              onChange={e => {
                this.setState({
                  dor: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="dor"
              label="dor"
              type="dor"
              defaultValue={this.props.user.dor}
            />

            <TextField
              onChange={e => {
                this.setState({
                  clubs: e.target.value
                });
              }}
              autoFocus
              margin="dense"
              id="clubs"
              label="Clubs"
              type="clubs"
              defaultValue={this.props.user.clubs}
            />

            <Typography paragraph>{this.state.Error}</Typography>
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
            <Button  onClick={this.props.update.bind(this,this.props.user._id,this.state.type,this.state.house,this.state.din,this.state.dor,this.state.tiqStatus,this.state.supervisorType)} color="black">
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;
