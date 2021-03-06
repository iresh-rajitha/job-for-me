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

import * as actions from '../actions/users'
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
    display: 'block',
    width: '1000px',
    transitionDuration: '0.3s',
    height: '18vw',
    raised: true,
  },
})

const SellerLandingPage = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const history = useHistory()
  console.log(history.location.state)
  const sellerId = history.location.state
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    props.fetchAllUsers()
  }, [props, history.location.state])

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
          <Grid
            container
            item
            xs={4}
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
          >
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
          </Grid>
          <Grid
            container
            item
            xs={4}
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
          >
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
          </Grid>
          <Grid
            container
            item
            xs={4}
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
          >
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
                    image='https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Your Gigs
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      View gigs that you are currently working on.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </section>
      <Footer />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  userList: state.users.list,
})

const mapActionToProps = {
  fetchAllUsers: actions.fetchAll,
  deleteUser: actions.Delete,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SellerLandingPage))
