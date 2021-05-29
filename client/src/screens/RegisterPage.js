import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux'

import { Grid, TextField, withStyles, Button } from '@material-ui/core'
import Container from '@material-ui/core/Container'

import * as actions from '../actions/users'
import useForm from '../useForm'
import LandngNav from '../components/LandingNav'
import Footer from '../components/Footer'

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

const RegisterPage = ({ classes, ...props }) => {
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
    setRole()
    if (validate()) {
      history.push({
        pathname: '/order',
        state: values.email,
      })
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
      }
      props.createUser(values, onSuccess)
    }
  }

  useEffect(() => {
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
            <h1 className='large text-primary'>Join with us!</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Create Your Customer Profile
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
                  name='firstName'
                  variant='outlined'
                  label='First Name'
                  value={values.firstName}
                  onChange={handleInputChange}
                  {...(errors.firstName && {
                    error: true,
                    helperText: errors.firstName,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='lastName'
                  variant='outlined'
                  label='Last Name'
                  value={values.lastName}
                  onChange={handleInputChange}
                  {...(errors.lastName && {
                    error: true,
                    helperText: errors.lastName,
                  })}
                />
              </Grid>
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
)(withStyles(styles)(RegisterPage))
