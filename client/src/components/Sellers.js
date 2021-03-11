import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/sellers";
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
import SellerForm from "./SellerForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import Popup from "./Popup";

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

const Sellers = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const [currentId, setCurrentId] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    props.fetchAllSellers();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteSeller(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };

  return (
    <section className="container">
      <Paper className={classes.paper} elevation={3}>
        <Grid>
          {/* <Grid item xs={6}>
            <SellerForm {...{ currentId, setCurrentId }} />
          </Grid> */}
          <Grid item xs={6}>
            <TableContainer>
              <Table>
                <TableHead className={classes.root}>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.sellerList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.firstName}</TableCell>
                        <TableCell>{record.lastName}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button>
                              <EditIcon
                                color="primary"
                                onClick={() => {
                                  setCurrentId(record.userId);
                                  setOpenPopup(true);
                                }}
                              />
                            </Button>
                            <Button>
                              <DeleteIcon
                                color="secondary"
                                onClick={() => {
                                  onDelete(record.userId);
                                }}
                              />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <SellerForm {...{ currentId, setCurrentId, setOpenPopup }} />
          </Popup>
        </Grid>
      </Paper>
    </section>
  );
};

const mapStateToProps = (state) => ({
  sellerList: state.sellers.list,
});

const mapActionToProps = {
  fetchAllSellers: actions.fetchAll,
  deleteSeller: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Sellers));
