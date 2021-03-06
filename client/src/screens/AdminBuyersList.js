import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

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
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import BuyerForm from '../components/BuyerForm'
import * as actions from '../actions/users'
import Popup from '../components/Popup'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'

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

const AdminBuyerList = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const adminId = history.location.state

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    props.fetchAllUsers()
  }, [props, history.location.state])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteUser(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
  }

  return (
    <Fragment>
      <AdminNav {...{ adminId }} />
      <section className='container'>
        <Paper className={classes.paper} elevation={3}>
          <Grid>
            <Grid item xs={12}>
              <InfiniteScroll dataLength={6} height={350}>
                <TableContainer>
                  <Table>
                    <TableHead className={classes.root}>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.userList.map((record, index) => {
                        if (record.userType === 'Buyer') {
                          return (
                            <TableRow key={index} hover>
                              <TableCell>{record.firstName}</TableCell>
                              <TableCell>{record.lastName}</TableCell>
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
              </InfiniteScroll>
            </Grid>
            <Popup
              title='Edit Buyer Details'
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <BuyerForm {...{ currentId, setCurrentId, setOpenPopup }} />
            </Popup>
          </Grid>
        </Paper>
      </section>
      <Footer />
    </Fragment>
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
)(withStyles(styles)(AdminBuyerList))
