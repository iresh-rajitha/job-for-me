import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, DialogActions, DialogContent, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './AddUpdateOrderPopUp.module.css' 
import axios from 'axios';
import Order from '../../../../models/order.model';
const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

  const initialValues={
    orderDetailID: 0,
    description: "",
    file: null,
    field: "",
    price : 0,
    fileName:"",
    deadline:""
  };
  const users= ['Iresh','Dhammike','Sachintha','Harith'];
export default function AssignOrderPopup(props) {
    const [formData, setFormData] = useState(initialValues);
    const [userValue, setUserValue] = React.useState(users[0]);
    const [inputValue, setInputValue] = React.useState('');

    const classes = useStyles();
    
    const handleClose = () => {
        onClose(selectedValue);
    };
    const submit=()=>{

    }
    const onChange = (e) =>{
        const{name,value} = e.target;
        setFormData({
          ...formData,
           [name]: value
         })
         console.log(name+" "+value);
      };
    const { onClose,selectedValue, open} = props;
    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
                <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
                <DialogContent>
                <Grid className={styles.marging_b_15px}>
                    <Autocomplete
                        value={userValue}
                        onChange={(event, newValue) => {
                        setUserValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={users}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Employee" variant="outlined" />}
                    />
          </Grid>
                <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={submit} variant="contained" color="primary">
                    Submit
                </Button>
                </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}
