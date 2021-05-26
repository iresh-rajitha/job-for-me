import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { Grid, withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useToasts } from 'react-toast-notifications'

import * as actions from '../actions/sellers'
import SellerNav from '../components/SellerNav'
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
  card: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
})

const Sellers = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const history = useHistory()
  console.log(history.location.state)
  const sellerId = history.location.state
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllSellers()
  }, [])

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteSeller(id, () =>
        addToast('Deleted successfully', { appearance: 'info' })
      )
  }
  return (
    <Fragment>
      <SellerNav {...{ sellerId }} />
      <section className='container'>
        <Grid container spacing={1}>
          <br />
          <br />
          <br />
          <br />
          <Link
            to={{
              pathname: '/order',
              state: sellerId,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Contemplative Reptile'
                  height='140'
                  image='https://images.unsplash.com/photo-1594835494259-43c6e66ad369?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'
                  title='Contemplative Reptile'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Browse as a Buyer
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    Go and have the customer experience!
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Click on the edit button to make changes
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Link>
          <Link
            to={{
              pathname: '/sellerprofile',
              state: sellerId,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Contemplative Reptile'
                  height='140'
                  image='https://images.unsplash.com/photo-1534683251650-3fd64cd1561a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1020&q=80'
                  title='Contemplative Reptile'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Your seller profile
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    Add account changes.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Link>
          <Link
            to={{
              pathname: '/yourordersseller',
              state: sellerId,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  alt='Contemplative Reptile'
                  height='140'
                  image='https://images.unsplash.com/photo-1509315703195-529879416a7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                  title='Contemplative Reptile'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Your Orders
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    View orders that you are currently working on.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Link>
        </Grid>
      </section>
      <Footer />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  sellerList: state.sellers.list,
})

const mapActionToProps = {
  fetchAllSellers: actions.fetchAll,
  deleteSeller: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Sellers))
