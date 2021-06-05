import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
  ButtonGroup,
  Button,
} from '@material-ui/core'
import SellerGigForm from './SellerGigForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ChatIcon from '@material-ui/icons/Chat'
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
  const history = useHistory()

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

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
      pathname: '/sellerchat',
      recieverId: sellerID,
      senderId: props.senderId,
    })
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Delivered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.gigList.map((record, index) => {
                  if (record.sellerId === props.sellerId) {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.startDate}</TableCell>
                        <TableCell>{record.deadline}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell>{record.description}</TableCell>
                        <TableCell>
                          <IconButton
                            style={{ marginRight: '10px' }}
                            aria-label='delete'
                            onClick={() => {
                              setCurrentId(record.gigId)
                              setOpenPopup(true)
                            }}
                          >
                            {record.delivered ? (
                              <CheckCircleOutlineIcon />
                            ) : (
                              <NotInterestedIcon></NotInterestedIcon>
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <ButtonGroup variant='text'>
                            <Button>
                              <ChatIcon
                                onClick={() => chatWithSeller(record.sellerId)}
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
          title='Gig Edit Form'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <SellerGigForm {...{ currentId, setCurrentId, setOpenPopup }} />
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
