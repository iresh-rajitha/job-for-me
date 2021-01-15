import React from "react";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";

const Order = () => {
  return (
    <section className="container">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/user/erondu/600x400"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some Custom text one can write here</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
};

export default Order;
