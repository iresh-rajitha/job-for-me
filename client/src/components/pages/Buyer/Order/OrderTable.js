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


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


export default function OrderTable(props) {
    const [rows,setRows]= useState(props.tableData);
    const classes = useStyles();
    useEffect(() => {
      setRows(rows=>props.tableData);
      // console.log(props.tableData);
    });
    const deleteOrder=(id)=>{
      // console.log(id);
      props.deleteFunction(id);
    }
    
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Files</TableCell>
                <TableCell align="left">Price($)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.orderDetailID}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.fileName}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="center">
                  <IconButton style={{marginRight:"10px"}} aria-label="delete">
                    <DeleteIcon  onClick={()=>deleteOrder(row.orderDetailID)} />
                    </IconButton>
                    <IconButton aria-label="delete">
                    <Edit/>
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
