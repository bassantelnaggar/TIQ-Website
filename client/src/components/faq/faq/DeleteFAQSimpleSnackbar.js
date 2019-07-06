import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



export default function DeleteFAQSimpleSnackbar(props) {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    // props.change1();
    props.undo();

}

  function handleClose(event, reason) {
      setOpen(false);
   // props.change1();
  }

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">FAQ Deleted Succcessfully</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={handleClick}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

