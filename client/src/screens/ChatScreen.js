import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

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
import DeleteIcon from '@material-ui/icons/Delete'
import { useToasts } from 'react-toast-notifications'

import MessagesForm from '../components/Chat'
import * as actions from '../actions/messages'
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

const Messages = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  let history = useHistory()
  const recieverId = history.location.recieverId
  const senderId = history.location.senderId

  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    props.fetchAllMessages()
  }, [props])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteMessage(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
    props.fetchAllMessages()
  }

  return (
    <Fragment>
      <AdminNav />
      <section className='container'>
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <MessagesForm
                {...{ currentId, recieverId, senderId, setCurrentId }}
              />
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <p className='lead'> Sent </p>
                <TableContainer>
                  <Table>
                    <TableHead className={classes.root}>
                      <TableRow></TableRow>
                    </TableHead>
                    <TableBody>
                      {props.messageList.map((record, index) => {
                        if (
                          record.from === senderId &&
                          record.to === recieverId
                        ) {
                          return (
                            <TableRow key={index} hover>
                              <TableCell>{record.text}</TableCell>
                              <TableCell>
                                <ButtonGroup variant='text'>
                                  <Button>
                                    <DeleteIcon
                                      color='secondary'
                                      onClick={() => {
                                        onDelete(record.messageID)
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

              <Grid item xs={6}>
                <p className='lead'> Replies </p>
                <TableContainer>
                  <Table>
                    <TableHead className={classes.root}>
                      <TableRow></TableRow>
                    </TableHead>
                    <TableBody>
                      {props.messageList.map((record, index) => {
                        if (
                          record.from === recieverId &&
                          record.to === senderId
                        ) {
                          return (
                            <TableRow key={index} hover>
                              <TableCell>{record.text}</TableCell>
                              <TableCell>
                                <ButtonGroup variant='text'>
                                  <Button></Button>
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
            </Grid>
            <Popup
              title='Message Form'
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <MessagesForm
                {...{
                  currentId,
                  recieverId,
                  senderId,
                  setCurrentId,
                  setOpenPopup,
                }}
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
  messageList: state.messages.list,
})

const mapActionToProps = {
  fetchAllMessages: actions.fetchAll,
  deleteMessage: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Messages))
