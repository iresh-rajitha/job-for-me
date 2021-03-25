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
import Field from '../../../../models/field.model';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const newField = new Field(0,"","");

function AddUpdateOrderPopUp(props) {
    const classes = useStyles();
    const { onClose,selectedValue, field, open} = props;
    const [formData, setFormData] = useState(newField);
    const {fieldID, fieldName, description} = formData;

    useEffect(() => {
      setFormData(field)
    },[field]);

    const onChange = (e) =>{
      const{name,value} = e.target;
      setFormData({
        ...formData,
         [name]: value
       })
       console.log(name+" "+value);
    };
  
    const handleClose = () => {
      onClose(selectedValue);
    };
    
    const submit = () => {
      formData.fieldName=fieldName;
      formData.description=description;
      // console.log(formData);
      axios.post('https://localhost:5001/api/field',formData)
      .then(res=>{
        console.log(res);
        handleClose();
      })
      .catch(err=>{
        console.log(err);
      });
    }
    
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
        <DialogContent>
          <Grid className={styles.marging_b_15px}>
            <TextField
              className={styles.textArea}
              id="outlined-multiline-static"
              value={formData.fieldName}
              name="fieldName"
              label="Field Name"
              onChange={(e) => onChange(e)}
              variant="outlined"
            />
          </Grid>
          <Grid className={styles.marging_b_15px}>
            <TextField
              className={styles.textArea}
              id="outlined-multiline-static"
              value={formData.description}
              name="description"
              label="Description"
              onChange={(e) => onChange(e)}
              multiline
              rows={3}
              variant="outlined"
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
    );
  }
  export default AddUpdateOrderPopUp;
