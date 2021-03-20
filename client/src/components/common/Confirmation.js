import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog'; 
import { Button, Container, DialogActions, DialogContent, Grid, TextField } from '@material-ui/core';
import { Message } from '@material-ui/icons';

 function Confirmation(props) { 
  const {onClose, message, open} = props;

  useEffect(()=>{
    // setDecesion(false);
  },[]);
    const handleClose = () => {
      // setDecesion(false);
      onClose(false);
    };
    
    const submit = () => {
      // setDecesion(true);
      onClose(true);
    }
    return (
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <Grid>
            {message}
          </Grid>
          <DialogActions>
          <Button onClick={handleClose} variant="contained">
            No
          </Button>
          <Button onClick={submit} variant="contained" color="primary">
            Yes
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
  export default Confirmation;
