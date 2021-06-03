import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
import { useToasts } from 'react-toast-notifications'

import BuyerForm from '../components/BuyerForm'
import * as actions from '../actions/users'
import Popup from '../components/Popup'
import BuyerNav from '../components/BuyerNav'
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

const BuyerProfile = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const buyerId = history.location.state
  const profileId = history.location.state

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    props.fetchAllUsers()
  }, [props, history.location.state])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete your Buyer Profile?'))
      props.deleteUser(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
    history.push('/login')
  }

  return (
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className='container'>
        <p className='lead'>Edit your Buyer Profile!</p>
        <Paper className={classes.paper} elevation={3}>
          <Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  {props.userList.map((record, index) => {
                    if (record.userId === profileId) {
                      return (
                        <TableHead className={classes.root}>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>{record.firstName}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Last Name</TableCell>
                            <TableCell>{record.lastName}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{record.email}</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>Edit or Delete</TableCell>
                            <TableCell>
                              <ButtonGroup variant='text'>
                                <Button>
                                  <EditIcon
                                    color='primary'
                                    onClick={() => {
                                      setCurrentId(record.userId)
                                      setOpenPopup(true)
                                    }}
                                  />
                                </Button>
                                <Button>
                                  <DeleteIcon
                                    color='secondary'
                                    onClick={() => {
                                      onDelete(record.userId)
                                    }}
                                  />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      )
                    }
                  })}
                </Table>
              </TableContainer>
            </Grid>
            <Popup
              title='Edit your Buyer Profile!'
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
)(withStyles(styles)(BuyerProfile))
