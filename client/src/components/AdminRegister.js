import React, { useEffect, Fragment } from 'react'
import { Grid, TextField, withStyles, Button } from '@material-ui/core'
import useForm from '../useForm'
import { connect } from 'react-redux'
import * as actions from '../actions/users'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

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
  userType: '',
  category: '',
  email: '',
  password: '',
}

const AdminRegister = ({ classes, ...props }) => {
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

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(
      initialFieldValues,
      validate,
      props.setCurrentId,
      props.setOpenPopup
    )

  const setRole = (fieldValues = values) => {
    fieldValues.userType = 'Admin'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setRole()
    if (validate()) {
      history.push({
        pathname: '/admin',
        state: values.email,
      })
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
      }

      props.createUser(values, onSuccess)
    }
  }

  useEffect(
    () => {
      if (props.currentId !== 0) {
        setValues({
          ...props.userList.find((x) => x.userId === props.currentId),
        })
        setErrors({})
      }
    },
    [props.currentId, props.userList],
    setErrors,
    setValues
  )
  return (
    <Fragment>
      <section className='container'>
        <div>
          <h1 className='large text-primary'>Add an Admin!</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create the Profile of the new Admin
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
                {...(errors.email && { error: true, helperText: errors.email })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='address'
                variant='outlined'
                label='Address'
                value={values.address}
                onChange={handleInputChange}
                {...(errors.address && {
                  error: true,
                  helperText: errors.address,
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
                  style={{ color: 'green' }}
                  type='submit'
                  className={classes.smMargin}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
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
)(withStyles(styles)(AdminRegister))
