import React, { useEffect, useState } from 'react'
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
import useForm from '../useForm'
import { connect } from 'react-redux'
import * as actions from '../actions/gigs'
import { useToasts } from 'react-toast-notifications'

import Message from './Message'

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
  startDate: new Date().toISOString(),
  deadline: '0001-01-01T00:00:00',
  category: '',
  buyerRating: 0,
  sellerRating: 0,
  description: 'I need ...',
  buyerId: 0,
  sellerId: 0,
  delivered: false,
  price: 0,
}

const SellersForm = ({ classes, ...props }) => {
  const { addToast } = useToasts()

  const [error, setError] = useState(false)

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('deadline' in fieldValues)
      temp.deadline = fieldValues.deadline ? '' : 'This field is required.'
    if ('description' in fieldValues)
      temp.description = fieldValues.description
        ? ''
        : 'This field is required.'
    if ('price' in fieldValues)
      temp.price = fieldValues.price ? '' : 'This field is required.'
    if ('category' in fieldValues)
      temp.category = fieldValues.category ? '' : 'This field is required.'
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
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const setBuyer = (fieldValues = values) => {
    fieldValues.buyerId = props.userId
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBuyer()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        addToast('Submitted successfully', { appearance: 'success' })
      }
      if (props.currentId === 0) {
        props.createGig(values, onSuccess)
      } else {
        props.updateGig(props.currentId, values, onSuccess)
      }
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.gigList.find((x) => x.gigId === props.currentId),
      })
      setErrors({})
    }
  }, [])
  return (
    <>
      {error && (
        <Message variant='danger'>
          Something went wrong! Please try again!
        </Message>
      )}
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
            label='Description'
            value={values.description}
            onChange={handleInputChange}
            {...(errors.description && {
              error: true,
              helperText: errors.description,
            })}
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
            name='deadline'
            variant='outlined'
            type='date'
            defaultValue={new Date()}
            value={values.deadline}
            onChange={handleInputChange}
            {...(errors.deadline && {
              error: true,
              helperText: errors.deadline,
            })}
          />

          <TextField
            name='price'
            variant='outlined'
            label='price'
            value={values.price}
            onChange={handleInputChange}
            {...(errors.price && { error: true, helperText: errors.price })}
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
    </>
  )
}

const mapStateToProps = (state) => ({
  gigList: state.gigs.list,
})

const mapActionToProps = {
  createGig: actions.create,
  updateGig: actions.update,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SellersForm))
