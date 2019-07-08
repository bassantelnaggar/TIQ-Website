import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom'

export default function Alert(props) {
  const [open, setOpen] = React.useState(true);
//console.log(props.message)
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
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{width:"400px",height:"100px"}}>
          <Link to="/TIQHome" className="button" color="primary" style = {{marginRight:'115sp',background: '#410c12'}}>
            Close
          </Link>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
