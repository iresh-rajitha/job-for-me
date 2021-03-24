import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/messages";
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
} from "@material-ui/core";
import MessagesForm from "./Chat";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import Popup from "../Popup";
import AdminNav from "../layout/AdminNav";
import Footer from "../layout/Footer";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const Messages = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  let history = useHistory();
  const recieverId = history.location.recieverId;
  const senderId = history.location.senderId;
  // console.log(history.location.recieverId);
  // console.log(history.location.senderId);

  const [currentId, setCurrentId] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  // const [recieverId, setRecieverId] = useState(0);
  // const [senderId, setSenderId] = useState(0);

  useEffect(() => {
    props.fetchAllMessages();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteMessage(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  return (
    <Fragment>
      <AdminNav />
      <section className="container">
        <Paper className={classes.paper} elevation={3}>
          <Grid>
            <Grid item xs={6}>
              <MessagesForm
                {...{ currentId, recieverId, senderId, setCurrentId }}
              />
            </Grid>
            <Grid item xs={12}>
              <p> Sent </p>
              <TableContainer>
                <Table>
                  <TableHead className={classes.root}>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {props.messageList.map((record, index) => {
                      if (record.from === senderId) {
                        return (
                          <TableRow key={index} hover>
                            <TableCell>{record.text}</TableCell>
                            <TableCell>
                              <ButtonGroup variant="text">
                                <Button>
                                  <EditIcon
                                    color="primary"
                                    onClick={() => {
                                      setCurrentId(record.messageID);
                                      setOpenPopup(true);
                                    }}
                                  />
                                </Button>
                                <Button>
                                  <DeleteIcon
                                    color="secondary"
                                    onClick={() => {
                                      onDelete(record.messageID);
                                    }}
                                  />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <p> Replies </p>
              <TableContainer>
                <Table>
                  <TableHead className={classes.root}>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {props.messageList.map((record, index) => {
                      if (record.from === recieverId) {
                        return (
                          <TableRow key={index} hover>
                            <TableCell>{record.text}</TableCell>
                            <TableCell>
                              <ButtonGroup variant="text">
                                <Button>
                                  <EditIcon
                                    color="primary"
                                    onClick={() => {
                                      setCurrentId(record.messageID);
                                      setOpenPopup(true);
                                    }}
                                  />
                                </Button>
                                <Button>
                                  <DeleteIcon
                                    color="secondary"
                                    onClick={() => {
                                      onDelete(record.messageID);
                                    }}
                                  />
                                </Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Popup
              title="Message Form"
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
  );
};

const mapStateToProps = (state) => ({
  messageList: state.messages.list,
});

const mapActionToProps = {
  fetchAllMessages: actions.fetchAll,
  deleteMessage: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Messages));
