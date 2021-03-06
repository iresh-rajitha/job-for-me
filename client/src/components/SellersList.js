import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/users'
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
import SellerForm from './SellerForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToasts } from 'react-toast-notifications'

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

const OrderSellers = ({ classes, ...props }) => {
  const { addToast } = useToasts()

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    props.fetchAllUsers()
  }, [props])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteUser(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.userList.map((record, index) => {
                  if (record.userType === 'Seller') {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.firstName}</TableCell>
                        <TableCell>{record.lastName}</TableCell>
                        <TableCell>{record.userId}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>
                          <ButtonGroup variant='text'>
                            <Button>
                              <EditIcon
                                color='action'
                                onClick={() => {
                                  setCurrentId(record.userId)
                                  setOpenPopup(true)
                                }}
                              />
                            </Button>
                            <Button>
                              <DeleteIcon
                                color='action'
                                onClick={() => {
                                  onDelete(record.userId)
                                }}
                              />
                            </Button>
                          </ButtonGroup>
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
          <SellerForm {...{ currentId, setCurrentId, setOpenPopup }} />
        </Popup>
      </Grid>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  userList: state.users.list,
})

const mapActionToProps = {
  fetchAllUsers: actions.fetchAll,
  deleteUser: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(OrderSellers))
