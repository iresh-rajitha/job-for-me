import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import AssignSeller from './AssignSeller'
import Popup from './Popup'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function AdminOrderTable(props) {
  const [openPopup, setOpenPopup] = useState(false)
  const [rows, setRows] = useState(props.tableData)
  const [orderId, setOrderId] = useState(0)

  const classes = useStyles()
  useEffect(() => {
    setRows((rows) => props.tableData)
    // console.log(props.tableData);
  })
  const deleteOrder = (id) => {
    props.deleteFunction(id)
  }
  const updateOrder = (obj) => {
    props.updateFunction(obj)
  }

  const assignSeller = (id) => {
    setOpenPopup(true)
    setOrderId(id)
    console.log(orderId)
  }

  return (
    <section>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Order ID</TableCell>
              <TableCell align='left'>Start Date</TableCell>
              <TableCell align='left'>Deadline</TableCell>
              <TableCell align='left'>Description</TableCell>
              <TableCell align='left'>Category</TableCell>
              <TableCell align='left'>Buyer ID</TableCell>
              <TableCell align='left'>Seller ID</TableCell>
              <TableCell align='center'>Assign a Seller</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align='left'>{row.orderID}</TableCell>
                <TableCell align='left'>{row.startDate}</TableCell>
                <TableCell align='left'>{row.deadline}</TableCell>
                <TableCell align='left'>{row.description}</TableCell>
                <TableCell align='left'>{row.comment}</TableCell>
                <TableCell align='left'>{row.from}</TableCell>
                <TableCell align='left'>{row.to}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    style={{ marginRight: '10px' }}
                    aria-label='delete'
                  >
                    <CheckCircleOutlineIcon
                      onClick={() => assignSeller(row.orderID)}
                    />
                  </IconButton>
                  {/* <IconButton aria-label="delete">
                  <Edit onClick={() => updateOrder(row)} />
                </IconButton> */}
                </TableCell>
                {/* <TableCell align="center">
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
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        title='Assign a Seller!'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssignSeller orderId={orderId} setOpenPopup={setOpenPopup} />
      </Popup>
    </section>
  )
}
