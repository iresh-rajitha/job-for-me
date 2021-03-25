import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BuyerNav from "../layout/BuyerNav";
import Footer from "../layout/Footer";

import AddUpdateOrderPopUp from "./Buyer/Order/AddUpdateOrderPopUp";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
});

const emails = ["username@gmail.com", "user02@gmail.com"];

const initialValues = {
  orderDetailID: 0,
  description: "",
  file: null,
  field: "",
  price: "",
  fileName: "",
};

const Order = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = useState(initialValues);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [field, setField] = useState(0);

  const history = useHistory();
  console.log(history.location.state);
  const buyerId = history.location.state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const illustration = () => {
    setField(1);
    console.log(field);
    setOpen(true);
  };

  const albumCovers = () => {
    setOpen(true);
    setField(2);
  };

  const vectorArts = () => {
    setOpen(true);
    setField(3);
  };

  const photoEditing = () => {
    setOpen(true);
    setField(4);
  };

  const videoEditing = () => {
    setOpen(true);
    setField(5);
  };

  const uiDesigning = () => {
    setOpen(true);
    setField(6);
  };

  const handleClose = (value) => {
    setOpen(false);
    console.log("refresh");
    // refreshOrderTable();
  };

  return (
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className="container">
        <div></div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}></Grid>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1579762593175-20226054cad0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1107&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Illustration
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={illustration}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1542539097-00f1e264494f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Album Covers
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={albumCovers}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1115&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Vector Arts
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={vectorArts}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1548101977-da6da849636b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Photo Editing
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={photoEditing}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1607112812619-182cb1c7bb61?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Video Editing
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={videoEditing}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1571101628768-6bae026844b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  UI Designing
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={uiDesigning}>
                Place Order
              </Button>
              {/* <Button size="small" color="primary">
                Learn More
              </Button> */}
            </CardActions>
          </Card>
        </Grid>
        <AddUpdateOrderPopUp
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          order={order}
          senderId={buyerId}
          field={field}
        />
      </section>
      <Footer />
    </Fragment>
  );
};

export default Order;
