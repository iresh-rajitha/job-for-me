import { Button, IconButton } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import AddUpdateOrderPopUp from './Order/AddUpdateOrderPopUp';
import OrderTable from './Order/OrderTable';
import { spacing } from '@material-ui/system';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const theme = {
  spacing: 8,
}

AddUpdateOrderPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function Orderpage() {
  useEffect(() => {
      refreshOrderTable();
  }, [])
  const [tableData, setTableData]= useState([]);

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => { 
        setOpen(true);
    };
    
    const handleClose = (value) => {
      setOpen(false);
      // setSelectedValue(value);
    };
    const refreshOrderTable=()=>{
      axios.get('https://localhost:44368/api/orderdetail')
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
        axios.delete('https://localhost:44368/api/orderdetail/'+id)
      .then(res=>{
        // tableData=res.data;
        setTableData(tableData=>res.data);
        console.log(tableData);
      })
      .catch(err=>{
        console.log(err);
      });
      // refreshOrderTable();
    }

    return (
        <div>
           <IconButton mb={10} style={{background: "#3f51b5",color:"white"}} aria-label="delete"  onClick={handleClickOpen}>
                <Add/>
            </IconButton>
            <AddUpdateOrderPopUp selectedValue={selectedValue} open={open} onClose={handleClose} />
            <OrderTable deleteFunction={deleteFunction} tableData={tableData} />
        </div>
    )
}
export default Orderpage;

