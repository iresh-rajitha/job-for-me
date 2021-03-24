import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import { Edit } from "@material-ui/icons";

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
  const [rows, setRows] = useState(props.tableData);
  const classes = useStyles();
  let history = useHistory();
  console.log(props.senderId);

  useEffect(() => {
    setRows((rows) => props.tableData);
    // console.log(props.tableData);
  });
  const deleteOrder = (id) => {
    props.deleteFunction(id);
  };
  const updateOrder = (obj) => {
    props.updateFunction(obj);
  };

  const chatWithBuyer = (buyerID) => {
    // history.push("./chat");
    history.push({
      pathname: "/chat",
      recieverId: buyerID,
      senderId: props.senderId,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">Deadline</TableCell>
            <TableCell align="left">Description</TableCell>
            {/* <TableCell align="left">Price($)</TableCell> */}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            if (row.to === props.senderId) {
              return (
                <TableRow key={index} hover>
                  <TableCell align="left">{row.startDate}</TableCell>
                  <TableCell align="left">{row.deadline}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  {/* <TableCell align="left">{row.price}</TableCell> */}
                  <TableCell align="center">
                    <IconButton
                      style={{ marginRight: "10px" }}
                      aria-label="delete"
                    >
                      <DeleteIcon
                        onClick={() => deleteOrder(row.orderDetailID)}
                      />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <Edit onClick={() => updateOrder(row)} />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <ChatIcon onClick={() => chatWithBuyer(row.from)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
