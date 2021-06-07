import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as actions from '../actions/gigs'
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
import GigForm from './GigForm'
import BuyerRating from './BuyerRating'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ChatIcon from '@material-ui/icons/Chat'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import StarIcon from '@material-ui/icons/Star'

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

const GigsList = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const history = useHistory()

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)
  const [openRating, setOpenRating] = useState(false)

  useEffect(() => {
    props.fetchAllGigs()
  }, [props])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteGig(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
  }

  const chatWithSeller = (sellerID) => {
    // history.push("./chat");
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
    <Paper className={classes.paper} elevation={3}>
      <Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Gig Id</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Is Seller Assigned?</TableCell>
                  <TableCell>Delivered</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.gigList.map((record, index) => {
                  if (record.buyerId === props.buyerId) {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.gigId}</TableCell>
                        <TableCell>{record.startDate}</TableCell>
                        <TableCell>{record.deadline}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>
                          {record.sellerId === 0 ? (
                            <NotInterestedIcon />
                          ) : (
                            <CheckCircleOutlineIcon />
                          )}
                        </TableCell>
                        <TableCell>
                          {record.delivered ? (
                            <CheckCircleOutlineIcon />
                          ) : (
                            <NotInterestedIcon></NotInterestedIcon>
                          )}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup variant='text'>
                            <Button>
                              <EditIcon
                                onClick={() => {
                                  setCurrentId(record.gigId)
                                  setOpenPopup(true)
                                }}
                              />
                            </Button>
                            <Button>
                              <DeleteIcon
                                onClick={() => {
                                  onDelete(record.gigId)
                                }}
                              />
                            </Button>
                            <Button>
                              <ChatIcon
                                onClick={() => chatWithSeller(record.sellerId)}
                              />
                            </Button>
                            <Button>
                              <CreditCardIcon
                                onClick={() => {
                                  payment()
                                }}
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                setCurrentId(record.gigId)
                                setOpenRating(true)
                              }}
                            >
                              {record.sellerRating === 0 ? (
                                <StarOutlineIcon />
                              ) : (
                                <StarIcon />
                              )}
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
          title='Gig Edit Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <GigForm {...{ currentId, setCurrentId, setOpenPopup }} />
        </Popup>
        <Popup
          title='Rate the Seller!'
          openPopup={openRating}
          setOpenPopup={setOpenRating}
        >
          <BuyerRating {...{ currentId, setCurrentId, setOpenRating }} />
        </Popup>
      </Grid>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  gigList: state.gigs.list,
})

const mapActionToProps = {
  fetchAllGigs: actions.fetchAll,
  deleteGig: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(GigsList))
