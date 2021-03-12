import { Button, IconButton } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
// import AddUpdateOrderPopUp from './AddUpdateOrderPopUp';
import AddUpdateFieldPopUp from './AddUpdateFieldPopUp';
// import OrderTable from './OrderTable';
import { spacing } from '@material-ui/system';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const theme = {
  spacing: 8,
}
const initialValues={
  description: "",
  file: null,
  field: "",
  price : "",
  fileName:""
};


function Orderpage() {
  useEffect(() => {
      refreshOrderTable();
  }, [])

  const [tableData, setTableData]= useState([]);
  const [order, setOrder]= useState(initialValues);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => { 
    setOpen(true);
  };
    
    const handleClose = (value) => {
      setOpen(false);
      refreshOrderTable();
      // console.log(value);
      // setSelectedValue(value);
    };
    const refreshOrderTable=()=>{
      axios.get('https://localhost:5001/api/orderdetail')
      .then(res=>{
        // tableData=res.data;
        setTableData(tableData=>res.data);
        console.log(tableData);
      })
      .catch(err=>{
        console.log(err);
      });
    }
    const deleteFunction=(id)=>{
        console.log(id);
        axios.delete('https://localhost:5001/api/orderdetail/'+id)
      .then(res=>{
        refreshOrderTable();
        console.log(tableData);
      })
      .catch(err=>{
        console.log(err);
      });
      // refreshOrderTable();
    }
    const updateFunction=(obj)=>{
      setOrder(obj);
      console.log(obj);
      console.log(order);
      handleClickOpen();
    // refreshOrderTable();
  }

    return (
        <div>
           <IconButton mb={10} style={{background: "#3f51b5",color:"white"}} aria-label="delete"  onClick={handleClickOpen}>
                <Add/>
            </IconButton>
            <AddUpdateFieldPopUp selectedValue={selectedValue} open={open} onClose={handleClose} order={order} />
            {/* <OrderTable updateFunction={updateFunction} deleteFunction={deleteFunction} tableData={tableData} /> */}
        </div>
    )
}
export default Orderpage;

