import React, { useEffect, useState } from 'react'
import {
  Grid,
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
  category: 'None',
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
    if ('sellerRating' in fieldValues)
      temp.sellerRating = fieldValues.sellerRating
        ? ''
        : 'This field is required.'
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
      props.setOpenRating
    )

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
          <FormControl
            variant='outlined'
            className={classes.formControl}
            {...(errors.category && { error: true })}
          >
            <InputLabel ref={inputLabel}>Rate the Seller!</InputLabel>
            <Select
              name='sellerRating'
              value={values.sellerRating}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value='1'>Poor</MenuItem>
              <MenuItem value='2'>Ok</MenuItem>
              <MenuItem value='3'>Good</MenuItem>
              <MenuItem value='4'>Great</MenuItem>
              <MenuItem value='5'>Excellent</MenuItem>
            </Select>
            {errors.sellerRating && (
              <FormHelperText>{errors.sellerRating}</FormHelperText>
            )}
          </FormControl>

          <Grid container justify='flex-end'>
            <Button
              variant='contained'
              style={{ color: 'green' }}
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
