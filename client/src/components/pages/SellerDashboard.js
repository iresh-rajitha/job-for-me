import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/sellers";
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
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import EmployeeList from "../EmployeeList";

import SellerNav from "../layout/SellerNav";
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
  card: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
});

const Sellers = ({ classes, ...props }) => {
  const { addToast } = useToasts();
  const history = useHistory();
  console.log(history.location.state);
  const sellerEmail = history.location.state;
  const [currentId, setCurrentId] = useState(0);

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
    <Fragment>
      <SellerNav {...{ sellerEmail }} />
      <section className="container">
        <Grid container spacing={1}>
          <br />
          <br />
          <br />
          <br />
          <Link to="/buyers">
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="https://images.unsplash.com/photo-1594835494259-43c6e66ad369?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Appointed Orders
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    View appointed orders for you!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Click on the edit button to make changes
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="small" color="primary">
              Buyers' List
            </Button> */}
                {/* <Link to="/seller" className="btn btn-primary">
              Buyers' List
            </Link> */}
                {/* <Button size="small" color="primary">
                Add a Buyer
              </Button> */}
              </CardActions>
            </Card>
          </Link>
          <Link
            to={{
              pathname: "/sellerprofile",
              state: sellerEmail,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="https://images.unsplash.com/photo-1534683251650-3fd64cd1561a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1020&q=80"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Your seller profile
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Add account changes.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="small" color="primary">
                Sellers' List
              </Button>
              <Button size="small" color="primary">
                Add a Seller
              </Button> */}
              </CardActions>
            </Card>
          </Link>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1509315703195-529879416a7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Orders
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography> */}
              </CardContent>
            </CardActionArea>
            <CardActions>
              {/* <Button size="small" color="primary">
              Orders' List
            </Button>
            <Button size="small" color="primary">
              Place a Order
            </Button> */}
            </CardActions>
          </Card>
        </Grid>
        {/* <Paper className={classes.paper} elevation={3}>
        <Grid>
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
                                }}
                              />
                            </Button>
                            <Button>
                              <DeleteIcon
                                color="secondary"
                                onClick={() => onDelete(record.userId)}
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
        </Grid>
      </Paper>
      <EmployeeList /> */}
      </section>
      <Footer />
    </Fragment>
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
