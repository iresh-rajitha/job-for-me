import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { Grid, TextField, withStyles, Button } from '@material-ui/core'
import Container from '@material-ui/core/Container'

import LandngNav from '../components/LandingNav'
import Footer from '../components/Footer'
import useForm from '../useForm'
import * as actions from '../actions/users'

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: '100%',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
})

const initialFieldValues = {
  firstName: '',
  lastName: '',
  address: '',
  userType: 'Buyer',
  category: '',
  email: '',
  password: '',
}

const LoginPage = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  let history = useHistory()

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? '' : 'This field is required.'
    if ('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? '' : 'This field is required.'
    if ('userTpye' in fieldValues)
      temp.userType = fieldValues.userType ? '' : 'This field is required.'
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? '' : 'This field is required.'
    if ('category' in fieldValues)
      temp.category = fieldValues.category ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.'
    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const setRole = (fieldValues = values) => {
    fieldValues.userType = 'Buyer'
  }

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      initialFieldValues,
      validate,
      props.setCurrentId,
      props.setOpenPopup
    )

  const handleSubmit = (e) => {
    e.preventDefault()

    props.userList.find((x) => {
      if (
        x.email == values.email &&
        x.password == values.password &&
        x.userType === 'Buyer'
      ) {
        addToast('Logged in successfully as a Buyer!', {
          appearance: 'success',
        })
        history.push({
          pathname: '/order',
          state: x.userId,
        })
      } else if (
        x.email == values.email &&
        x.password == values.password &&
        x.userType === 'Seller'
      ) {
        addToast('Logged in successfully as a Seller!', {
          appearance: 'success',
        })
        history.push({
          pathname: '/sellerdashboard',
          state: x.userId,
        })
      } else if (
        x.email == values.email &&
        x.password == values.password &&
        x.userType === 'Admin'
      ) {
        addToast('Logged in successfully as an Admin', {
          appearance: 'success',
        })
        history.push({
          pathname: '/admin',
          state: x.userId,
        })
      }
    })
  }

  useEffect(() => {
    props.fetchAllUsers()
    if (props.currentId !== 0) {
      setValues({
        ...props.userList.find((x) => x.userId === props.currentId),
      })
      setErrors({})
    }
  }, [props.currentId])
  return (
    <Fragment>
      <LandngNav />
      <section className='container'>
        <Container component='main' maxWidth='xs'>
          <div>
            <h1 className='large text-primary'>Let's log in first!</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Log into your Customer profile
            </p>
          </div>
          <form
            autoComplete='off'
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  name='email'
                  variant='outlined'
                  label='Email'
                  value={values.email}
                  onChange={handleInputChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='password'
                  type='password'
                  variant='outlined'
                  label='Password'
                  value={values.password}
                  onChange={handleInputChange}
                  {...(errors.password && {
                    error: true,
                    helperText: errors.password,
                  })}
                />
                <div>{props.currentId}</div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    className={classes.smMargin}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Container>
      </section>

      <Footer />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  userList: state.users.list,
})

const mapActionToProps = {
  createUser: actions.create,
  updateUser: actions.update,
  fetchAllUsers: actions.fetchAll,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(LoginPage))
