import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import AssignSellerForm from './AssignSellerForm'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import IconButton from '@material-ui/core/IconButton'

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

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    props.fetchAllGigs()
  }, [props])

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
                          <CheckCircleOutlineIcon style={{ color: 'green' }} />
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
        </Grid>
        <Popup
          title='Seller Assign Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AssignSellerForm {...{ currentId, setCurrentId, setOpenPopup }} />
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
