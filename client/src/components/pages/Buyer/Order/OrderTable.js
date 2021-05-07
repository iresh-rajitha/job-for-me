import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit } from '@material-ui/icons';
import Confirmation from '../../../common/Confirmation';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

//   AddUpdateOrderPopUp.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
//   };
// const handleClickOpen = () => { 
//   setOpen(true);
// };
// const handleClose = (value) => {
//   setOpen(false);
// };

export default function OrderTable(props) {
    const [open,setOpen]= useState(false);
    const [id,setID]= useState(0);
    const [message,setMessage]= useState("default message");
    const [rows,setRows]= useState(props.tableData);
    const classes = useStyles();
    useEffect(() => {
      setRows(rows=>props.tableData);
      console.log(props.tableData);
    });
    const deleteOrder=(id)=>{
      // props.deleteFunction(id);
      setID(id);
      setMessage("Do you want to delete field "+id);
      handleClickOpen();
    }
    const updateOrder=(obj)=>{
      props.updateFunction(obj);
    }
    const handleClose = (value) => {
      console.log(value);
      if(value){
        props.deleteFunction(id);
      }
      setOpen(false);
    }
    const handleClickOpen = () => { 
      setOpen(true);
    };
    return (
      <div>
<TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price($)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.orderDetailID}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="center">
                  <IconButton style={{marginRight:"10px"}} aria-label="delete">
                    <DeleteIcon  onClick={()=>deleteOrder(row.orderDetailID)}/>
                    </IconButton>
                    <IconButton aria-label="delete">
                    <Edit   onClick={()=>updateOrder(row)}/>
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Confirmation open={open} onClose={handleClose} message={message}/>
      </div>
        
      );
}
