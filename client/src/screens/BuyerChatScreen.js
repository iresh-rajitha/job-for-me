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

import MessagesForm from '../components/BuyerChat'
import * as actions from '../actions/messages'
import InfiniteScroll from 'react-infinite-scroll-component'
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

const Messages = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  let history = useHistory()
  const recieverId = history.location.recieverId
  const senderId = history.location.senderId
  const buyerId = history.location.senderId

  const [currentId, setCurrentId] = useState(0)

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
      <BuyerNav {...{ buyerId }} />
      <section className='container'>
        <Paper className={classes.paper} elevation={3}>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              spacing={0}
              direction='column'
              alignItems='center'
              justify='center'
            >
              <div>
                <h1 className='large text-primary'>Chat with your Seller!</h1>
                <p className='lead'>
                  <i className='fas fa-user'></i> Add you message in the below
                  box
                </p>
              </div>

              <InfiniteScroll dataLength={6} height={200}>
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
                              <TableCell>Me:</TableCell>
                              <TableCell>{record.text}</TableCell>
                              <TableCell>{record.sentAt}</TableCell>
                              <TableCell>
                                <ButtonGroup variant='text'>
                                  <Button>
                                    <DeleteIcon
                                      color='action'
                                      onClick={() => {
                                        onDelete(record.messageID)
                                      }}
                                    />
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          )
                        } else if (
                          record.from === recieverId &&
                          record.to === senderId
                        ) {
                          return (
                            <TableRow key={index} hover>
                              <TableCell>Customer:</TableCell>
                              <TableCell>{record.text}</TableCell>
                              <TableCell>{record.sentAt}</TableCell>
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
              </InfiniteScroll>

              <MessagesForm
                {...{ currentId, recieverId, senderId, setCurrentId }}
              />
            </Grid>
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
