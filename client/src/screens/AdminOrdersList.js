import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
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
} from '@material-ui/core'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import IconButton from '@material-ui/core/IconButton'

import { useToasts } from 'react-toast-notifications'

import Popup from '../components/Popup'
import AdminNav from '../components/AdminNav'
import Footer from '../components/Footer'
import AssignSellerForm from '../components/AssignSellerForm'

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
  const adminId = history.location.state

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    props.fetchAllGigs()
  }, [props, history])

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
                        <TableCell>Gig Id</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Buyer Id</TableCell>
                        <TableCell>Seller Id</TableCell>
                        <TableCell>Delivered</TableCell>
                        <TableCell>Assign a Seller</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.gigList.map((record, index) => {
                        return (
                          <TableRow key={index} hover>
                            <TableCell>{record.gigId}</TableCell>
                            <TableCell>{record.startDate}</TableCell>
                            <TableCell>{record.deadline}</TableCell>
                            <TableCell>{record.category}</TableCell>
                            <TableCell>{record.description}</TableCell>
                            <TableCell>{record.buyerId}</TableCell>
                            <TableCell>{record.sellerId}</TableCell>
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
                              <IconButton
                                style={{ marginRight: '10px' }}
                                aria-label='delete'
                                onClick={() => {
                                  setCurrentId(record.gigId)
                                  setOpenPopup(true)
                                }}
                              >
                                {record.sellerId === 0 ? (
                                  <NotInterestedIcon style={{ color: 'red' }} />
                                ) : (
                                  <CheckCircleOutlineIcon
                                    style={{ color: 'green' }}
                                  />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </InfiniteScroll>
            </Grid>
            <Popup
              title='Seller Assign Form'
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <AssignSellerForm
                {...{ currentId, setCurrentId, setOpenPopup }}
              />
            </Popup>
          </Grid>
        </Paper>
      </section>
      <Footer />
    </Fragment>
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
