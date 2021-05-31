import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

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
import InputAdornment from '@material-ui/core/InputAdornment'

import useForm from '../useForm'
import * as actions from '../actions/orders'

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
  orderDetailID: 0,
  description: '',
  file: null,
  field: 'None',
  price: 0,
  fileName: '',
  deadline: '',
}

const OrderEditForm = ({ classes, ...props }) => {
  const { addToast } = useToasts()
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('description' in fieldValues)
      temp.description = fieldValues.description
        ? ''
        : 'This field is required.'
    if ('deadline' in fieldValues)
      temp.deadline = fieldValues.deadline ? '' : 'This field is required.'
    if ('price' in fieldValues)
      temp.price = fieldValues.price ? '' : 'This field is required.'
    if ('fields' in fieldValues)
      temp.fields = fieldValues.fields ? '' : 'This field is required.'
    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  //material-ui select
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
      }
      if (props.currentId === 0) {
        props.createOrder(values, onSuccess)
      } else {
        props.updateOrder(props.currentId, values, onSuccess)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const fieldValue = { [name]: value }
    setValues({
      ...values,
      ...fieldValue,
    })
    validate(fieldValue)
  }

  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    })
    setErrors({})
    props.setCurrentId(0)
    props.setOpenPopup(false)
  }

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.orderList.find((x) => x.orderID === props.currentId),
      })
      setErrors({})
    }
  }, [props])
  return (
    <form
      autoComplete='off'
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <TextField
          name='description'
          variant='outlined'
          label='First Name'
          value={values.description}
          onChange={handleInputChange}
          {...(errors.description && {
            error: true,
            helperText: errors.description,
          })}
        />
        <TextField
          id='date'
          label='Deadline'
          type='date'
          defaultValue={new Date()}
          name='deadline'
          value={values.deadline}
          onChange={handleInputChange}
        />
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

        <TextField
          id='standard-adornment-amount'
          value={values.price}
          name='price'
          onChange={handleInputChange}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
        />
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
    </form>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orders.list,
})

const mapActionToProps = {
  createOrder: actions.create,
  updateOrder: actions.update,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(OrderEditForm))
