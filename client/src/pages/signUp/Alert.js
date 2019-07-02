import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom'

export default function Alert() {
  const [open, setOpen] = React.useState(true);

  function handleClose() {
    setOpen(false);
    this.props.history.push("/TIQHome");

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {/* <DialogTitle id="form-dialog-title">T</DialogTitle> */}
        <DialogContent>
          <DialogContentText style={{fontSize:"140%",textAlign:"center"}}>
            Please wait for <br></br>your confirmation mail.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{width:"400px",height:"100px"}}>
          <Link to="/TIQHome" className="button" color="primary" style = {{marginRight:'115px',background: '#410c12'}}>
            Close
          </Link>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
