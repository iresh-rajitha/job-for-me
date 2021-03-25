import React, { Fragment } from "react";
//import { Card, Button } from "react-bootstrap";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
});

const Order = () => {
  const classes = useStyles();

  const history = useHistory();
  console.log(history.location.state);
  const buyerId = history.location.state;

  return (
<<<<<<< HEAD
    <section className="container">
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem", height: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
=======
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className="container">
        <div></div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {/* <Card style={{ width: "18rem" }}>
>>>>>>> origin/front-grid
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card>
        </Grid>
      </div>
      <div className="column">
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
            </Card.Body>
          </Card> */}
          </Grid>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
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
              <Button size="small" color="primary">
                Place Order
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
<<<<<<< HEAD
      </div>
    </section>
=======
      </section>
      <Footer />
    </Fragment>
>>>>>>> origin/front-grid
  );
};

export default Order;
