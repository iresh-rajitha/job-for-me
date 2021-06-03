import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ChatIcon from '@material-ui/icons/Chat'
import CreditCardIcon from '@material-ui/icons/CreditCard'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function OrderTable(props) {
  const [rows, setRows] = useState(props.tableData)

  const classes = useStyles()
  let history = useHistory()

  useEffect(() => {
    setRows(props.tableData)
  })
  const deleteOrder = (id) => {
    props.deleteFunction(id)
    setRows(props.tableData)
  }
  const updateOrder = (obj) => {
    props.updateFunction(obj)
    setRows(props.tableData)
  }

  const chatWithSeller = (sellerID) => {
    history.push({
      pathname: '/buyerchat',
      recieverId: sellerID,
      senderId: props.senderId,
    })
  }

  const payment = () => {
    history.push('./payment')
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Start Date</TableCell>
              <TableCell align='center'>Deadline</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Assigned Seller Id</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              if (row.from === props.senderId) {
                return (
                  <TableRow key={index}>
                    <TableCell align='center'>{row.startDate}</TableCell>
                    <TableCell align='center'>{row.deadline}</TableCell>
                    <TableCell align='center'>{row.description}</TableCell>
                    <TableCell align='center'>{row.to}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        style={{ marginRight: '10px' }}
                        aria-label='delete'
                      >
                        <DeleteIcon
                          onClick={() => deleteOrder(row.orderDetailID)}
                        />
                      </IconButton>
                      <IconButton aria-label='delete'>
                        <ChatIcon onClick={() => chatWithSeller(row.to)} />
                      </IconButton>
                      <IconButton aria-label='delete'>
                        <CreditCardIcon onClick={() => payment()} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <p> * If Assigned Seller Id is 0, then it is not assigned yet!</p>
    </Fragment>
  )
}
