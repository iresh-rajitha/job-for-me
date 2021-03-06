import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

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

  const onDelete = (id, sellerId) => {
    if (sellerId === 0) {
      if (window.confirm('Are you sure to delete this record?'))
        props.deleteGig(id, () =>
          addToast('Deleted successfully', { appearance: 'info' })
        )
    } else {
      addToast('Delete feature is disabled after the seller is assigned!', {
        appearance: 'info',
      })
    }
  }

  const handleEdit = (gigId, delivered) => {
    if (!delivered) {
      setCurrentId(gigId)
      setOpenPopup(true)
    } else {
      addToast('Edit feature is disabled for delivered gigs!', {
        appearance: 'info',
      })
    }
  }

  const handleRating = (gigId, delivered) => {
    if (!delivered) {
      setCurrentId(gigId)
      setOpenRating(true)
    } else {
      addToast('Rating feature is disabled for delivered gigs!', {
        appearance: 'info',
      })
    }
  }

  const chatWithSeller = (sellerID, delivered) => {
    if (!delivered) {
      history.push({
        pathname: '/buyerchat',
        recieverId: sellerID,
        senderId: props.senderId,
      })
    } else {
      addToast('Chat option is disabled for delivered gigs!', {
        appearance: 'info',
      })
    }
  }

  const payment = (delivered) => {
    if (!delivered) {
      history.push('./payment')
    } else {
      addToast('Payment feature is disabled for delivered gigs!', {
        appearance: 'info',
      })
    }
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid>
        <Grid item xs={12}>
          <InfiniteScroll dataLength={6} height={350}>
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
                              <NotInterestedIcon style={{ color: 'red' }} />
                            ) : (
                              <CheckCircleOutlineIcon
                                style={{ color: 'green' }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {record.delivered ? (
                              <CheckCircleOutlineIcon
                                style={{ color: 'green' }}
                              />
                            ) : (
                              <NotInterestedIcon style={{ color: 'red' }} />
                            )}
                          </TableCell>
                          <TableCell>
                            <ButtonGroup variant='text'>
                              <Button>
                                <EditIcon
                                  color={
                                    record.delivered ? 'disabled' : 'action'
                                  }
                                  onClick={() => {
                                    handleEdit(record.gigId, record.delivered)
                                  }}
                                />
                              </Button>
                              <Button>
                                <DeleteIcon
                                  color={
                                    record.sellerId === 0
                                      ? 'action'
                                      : 'disabled'
                                  }
                                  onClick={() => {
                                    onDelete(record.gigId, record.sellerId)
                                  }}
                                />
                              </Button>
                              <Button>
                                <ChatIcon
                                  color={
                                    record.delivered ? 'disabled' : 'action'
                                  }
                                  onClick={() =>
                                    chatWithSeller(
                                      record.sellerId,
                                      record.delivered
                                    )
                                  }
                                />
                              </Button>
                              <Button>
                                <CreditCardIcon
                                  color={
                                    record.delivered ? 'disabled' : 'action'
                                  }
                                  onClick={() => {
                                    payment(record.delivered)
                                  }}
                                />
                              </Button>
                              <Button
                                onClick={() => {
                                  handleRating(record.gigId, record.delivered)
                                }}
                              >
                                {record.sellerRating === 0 ? (
                                  <StarOutlineIcon
                                    color={
                                      record.delivered ? 'disabled' : 'action'
                                    }
                                  />
                                ) : (
                                  <StarIcon
                                    color={
                                      record.delivered ? 'disabled' : 'action'
                                    }
                                  />
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
          </InfiniteScroll>
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
