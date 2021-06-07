import React, { useEffect } from 'react'
import { Grid, TextField, withStyles, Button } from '@material-ui/core'
import useForm from '../useForm'
import { connect } from 'react-redux'
import * as actions from '../actions/users'
import { useToasts } from 'react-toast-notifications'

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
  userType: 'Seller',
  category: '',
  email: '',
  password: '',
}

const AdminForm = ({ classes, ...props }) => {
  const { addToast } = useToasts()

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? '' : 'This field is required.'
    if ('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? '' : 'This field is required.'
    if ('address' in fieldValues)
      temp.address = fieldValues.address ? '' : 'This field is required.'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
      }
      if (props.currentId === 0) {
        props.createUser(values, onSuccess)
      } else {
        props.updateUser(props.currentId, values, onSuccess)
      }
    }
  }

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.userList.find((x) => x.userId === props.currentId),
      })
      setErrors({})
    }
  }, [props.currentId, props.userList, setValues, setErrors])
  return (
    <form
      autoComplete='off'
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
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

        <TextField
          name='email'
          variant='outlined'
          label='Email'
          value={values.email}
          onChange={handleInputChange}
          {...(errors.email && { error: true, helperText: errors.email })}
        />
        <TextField
          name='address'
          variant='outlined'
          label='Address'
          value={values.address}
          onChange={handleInputChange}
          {...(errors.address && { error: true, helperText: errors.address })}
        />
        <Grid container justify='flex-end'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.smMargin}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStateToProps = (state) => ({
  userList: state.users.list,
})

const mapActionToProps = {
  createUser: actions.create,
  updateUser: actions.update,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AdminForm))
