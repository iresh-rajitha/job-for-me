import React, { useEffect, Fragment } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from '@material-ui/core'
import Container from '@material-ui/core/Container'

import useForm from '../useForm'
import * as actions from '../actions/users'
import BuyerNav from '../components/BuyerNav'
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
  userType: '',
  category: '',
  email: '',
  password: '',
}

const BuyerToSeller = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  let history = useHistory()
  const buyerId = history.location.state

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

  //material-ui select
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [history.location.state])

  const setRole = (fieldValues = values) => {
    fieldValues.userType = 'Seller'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setRole()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
        props.fetchAllUsers()
      }
      props.deleteUser(buyerId, onSuccess)

      props.createUser(values, onSuccess)

      props.userList.find((x) => {
        if (x.email == values.email) {
          history.push({
            pathname: '/sellerdashboard',
            state: x.userId,
          })
        }
      })
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
      <BuyerNav {...{ buyerId }} />

      <section className='container'>
        <Container component='main' maxWidth='xs'>
          <div>
            <h1 className='large text-primary'>Become a Seller!</h1>
            <p className='lead'>
              <i className='fas fa-user'></i> Create Your Seller Profile
            </p>
            <p>* This will delete your customer profile!.</p>
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
                <FormControl
                  variant='outlined'
                  className={classes.formControl}
                  {...(errors.category && { error: true })}
                >
                  <InputLabel ref={inputLabel}>Category</InputLabel>
                  <Select
                    name='category'
                    value={values.category}
                    onChange={handleInputChange}
                    labelWidth={labelWidth}
                  >
                    <MenuItem value=''>Select a Category</MenuItem>
                    <MenuItem value='illustration'>Illustration</MenuItem>
                    <MenuItem value='albumCovers'>Album Covers</MenuItem>
                    <MenuItem value='vectorArts'>Vector Arts</MenuItem>
                    <MenuItem value='photoEditing'>Photo Editing</MenuItem>
                    <MenuItem value='videoEditing'>Video Editing</MenuItem>
                    <MenuItem value='uiDesigning'>UI Designing</MenuItem>
                  </Select>
                  {errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
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
                  type='password'
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
  deleteUser: actions.Delete,
  fetchAllUsers: actions.fetchAll,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(BuyerToSeller))
