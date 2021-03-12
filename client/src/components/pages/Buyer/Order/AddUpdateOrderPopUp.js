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


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const fields = 
[
  'None',
  'The Graphic Design',
 'Technology',
 'Web Design Design',
 'Illustrator',
 'Data Entry',
 'Data Analysis',
 'Ecommerce'
];

const initialValues={
  orderDetailID: 0,
  description: "",
  file: null,
  field: fields[0],
  price : "",
  fileName:""
};

function AddUpdateOrderPopUp(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open , order} = props;
    const [formData, setFormData] = useState(initialValues);
    const [fieldValue, setFieldValue] = React.useState(fields[0]);
    const [inputValue, setInputValue] = React.useState('');

    const {orderdetailID,description,file,field,price,fileName} = formData;

    useEffect(() => {
      // setRows(rows=>props.tableData);
      // console.log(props.order);
      setFormData(order);
    },[order]);

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
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const handleFile=(e)=>{
      console.log(e.target.files);
      formData.file = e.target.files[0];
    }
    const changeField=(e)=>{
      formData.field= e.target.value;
    }
    
    const submit = () => {
      console.log(formData);
      const fd= new FormData();
      fd.append('orderdetailID',formData.orderDetailID);
      fd.append('Description',formData.description);
      fd.append('File',formData.file);
      fd.append('Field',formData.field);
      fd.append('Price',formData.price);
      fd.append('FileName',formData.fileName);

      console.log(fd.get('orderdetailID'));
      console.log(fd.get('Description'));
      // console.log(fd);
      if(fd.get('orderdetailID') ==0){
        axios.post('https://localhost:5001/api/OrderDetail',fd)
      .then(res=>{
        console.log(res);
        handleClose();
      })
      .catch(err=>{
        console.log(err);
      });
      }else{
        // console.log(formData.orderdetailID);
        axios.put('https://localhost:5001/api/OrderDetail/'+ fd.get('orderdetailID') ,fd)
        .then(res=>{
          console.log(res);
          handleClose();
        })
        .catch(err=>{
          console.log(err);
        });
      }
      
    }
    
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
        <DialogContent>
          <Grid className={styles.marging_b_15px}>
            <TextField
              className={styles.textArea}
              id="outlined-multiline-static"
              value={description}
              name="description"
              label="Description"
              onChange={(e) => onChange(e)}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid className={styles.marging_b_15px}>
            {/* <input 
            type="file"
            value={file}
            name="file"
            variant="outlined"
            onChange={(e) => handleFile(e)}
            /> */}
          </Grid>

          <Grid className={styles.marging_b_15px}>
          <Autocomplete
            value={fieldValue}
            onChange={(event, newValue) => {
              setFieldValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={fields}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Field" variant="outlined" />}
          />
          </Grid>

          <Grid className={styles.marging_b_15px}>
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={price}
                name="price"
                onChange={(e) => onChange(e)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
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
