import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import OrderEditForm from './OrderEditForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ChatIcon from '@material-ui/icons/Chat'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import { Edit } from '@material-ui/icons'

import * as actions from '../actions/orders'
import Popup from './Popup'

const styles = (theme) => ({
  root: {
    '& .MuiTableCell-head': {
      fontSize: '1.25rem',
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
})

const Orders = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  let history = useHistory()

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    props.fetchAllOrders()
  }, [props])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteOrder(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
  }
  const chatWithSeller = (sellerID) => {
    // history.push("./chat");
    history.push({
      pathname: '/chat',
      recieverId: sellerID,
      senderId: props.senderId,
    })
  }

  const payment = () => {
    history.push('./payment')
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell align='center'>Start Date</TableCell>
                  <TableCell align='center'>Deadline</TableCell>
                  <TableCell align='center'>Description</TableCell>
                  <TableCell align='center'>Assigned Seller ID</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.orderList.map((record, index) => {
                  if (record.from === props.senderId) {
                    return (
                      <TableRow key={index} hover>
                        <TableCell align='center'>{record.startDate}</TableCell>
                        <TableCell align='center'>{record.deadline}</TableCell>
                        <TableCell align='center'>
                          {record.description}
                        </TableCell>
                        <TableCell align='center'>{record.to}</TableCell>
                        <TableCell align='center'>
                          <IconButton
                            style={{ marginRight: '10px' }}
                            aria-label='delete'
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton aria-label='delete'>
                            <Edit
                              onClick={() => {
                                setCurrentId(record.orderID)
                                setOpenPopup(true)
                              }}
                            />
                          </IconButton>
                          <IconButton aria-label='delete'>
                            <ChatIcon
                              onClick={() => {
                                onDelete(record.to)
                              }}
                            />
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
        </Grid>
        <Popup
          title='Employee Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <OrderEditForm {...{ currentId, setCurrentId, setOpenPopup }} />
        </Popup>
      </Grid>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orders.list,
})

const mapActionToProps = {
  fetchAllOrders: actions.fetchAll,
  deleteOrder: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Orders))
