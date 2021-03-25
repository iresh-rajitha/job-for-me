import { Button, IconButton } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import AddUpdateFieldPopUp from './AddUpdateFieldPopUp';
import { spacing } from '@material-ui/system';
import FieldTable from './fieldTable';
import Field from '../../../../models/field.model';

const theme = {
  spacing: 8,
}

function Orderpage() {
  useEffect(() => {
      refreshOrderTable();
  }, [])

  const [tableData, setTableData]= useState([]);
  const [field, setField]= useState(new Field(0,"",""));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { 
    setOpen(true);
  };
    
    const handleClose = (value) => {
      setOpen(false);
      refreshOrderTable();
    };
    const refreshOrderTable=()=>{
      axios.get('https://localhost:5001/api/field')
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
        axios.delete('https://localhost:5001/api/field/'+id)
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
      console.log(obj);
      setField(obj);
      handleClickOpen();
    // refreshOrderTable();
  }

    return (
        <div>
           <IconButton mb={10} style={{background: "#3f51b5",color:"white"}} aria-label="delete"  onClick={handleClickOpen}>
                <Add/>
            </IconButton>
            <AddUpdateFieldPopUp open={open} onClose={handleClose}  field={field}/>
            <FieldTable updateFunction={updateFunction} deleteFunction={deleteFunction} tableData={tableData} />
        </div>
    )
}
export default Orderpage;

