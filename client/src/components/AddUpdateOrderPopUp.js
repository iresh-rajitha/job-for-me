import axios from 'axios'
import React, { useState, useEffect } from 'react'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { blue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

import Order from '../models/order.model'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
})
const fields = [
  'None',
  'Illustration',
  'Album Covers',
  'Vector Arts',
  'Photo Editing',
  'Video Editing',
  'UI Designing',
]

const initialValues = {
  orderDetailID: 0,
  description: '',
  file: null,
  field: fields[0],
  price: 0,
  fileName: '',
  deadline: '',
}

function AddUpdateOrderPopUp(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open, order, senderId } = props
  const [formData, setFormData] = useState(initialValues)
  const [fieldValue, setFieldValue] = React.useState(fields[props.field])
  const [inputValue, setInputValue] = React.useState('')
  const [newOrder, setNewOrder] = useState(
    new Order(
      0,
      '2021-01-06T17:16:40',
      '2021-01-06T17:16:40',
      '',
      0,
      '',
      0,
      0,
      0
    )
  )

  const { orderdetailID, deadline, description, file, field, price, fileName } =
    formData

  useEffect(() => {
    setFormData(order)
    console.log(props.senderId)
  }, [order])

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log(name + ' ' + value)
  }

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  const handleFile = (e) => {
    console.log(e.target.files)
    formData.file = e.target.files[0]
  }
  const changeField = (e) => {
    formData.field = e.target.value
  }

  const submit = () => {
    console.log(formData)
    const fd = new FormData()
    fd.append('orderDetailID', formData.orderDetailID)
    fd.append('Description', formData.description)
    fd.append('File', formData.file)
    fd.append('Field', formData.field)
    fd.append('Price', formData.price)
    fd.append('FileName', formData.fileName)

    newOrder.startDate = new Date().toISOString()
    newOrder.deadline = formData.deadline
    formData.price = parseFloat(formData.price)
    newOrder.orderDetail = formData
    newOrder.description = formData.description
    console.log(props.senderId)
    newOrder.from = props.senderId
    newOrder.comment = fieldValue
    console.log(newOrder)
    if (fd.get('orderDetailID') == 0) {
      axios
        .post('https://localhost:5001/api/order', newOrder)
        .then((res) => {
          console.log(res)
          handleClose()
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .put(
          'https://localhost:5001/api/OrderDetail/' + fd.get('orderDetailID'),
          fd
        )
        .then((res) => {
          console.log(res)
          handleClose()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      open={open}
    >
      <DialogTitle id='form-dialog-title'>Add Order</DialogTitle>
      <DialogContent>
        <Grid className='marging_b_15px'>
          <TextField
            className='textArea'
            id='outlined-multiline-static'
            value={description}
            name='description'
            label='Description'
            onChange={(e) => onChange(e)}
            multiline
            rows={3}
            variant='outlined'
          />
        </Grid>
        <Grid className='marging_b_15px'>
          <Autocomplete
            value={fieldValue}
            onChange={(event, newValue) => {
              setFieldValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            id='controllable-states-demo'
            options={fields}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Field' variant='outlined' />
            )}
          />
        </Grid>
        <Grid className='marging_b_15px'></Grid>

        <Grid className='marging_b_15px'></Grid>
        <Grid>
          <TextField
            id='date'
            label='Deadline'
            type='date'
            defaultValue={new Date()}
            name='deadline'
            value={deadline}
            onChange={(e) => onChange(e)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid className='marging_b_15px'>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor='standard-adornment-amount'>Amount</InputLabel>
            <Input
              id='standard-adornment-amount'
              value={price}
              name='price'
              onChange={(e) => onChange(e)}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>
          <Button onClick={submit} variant='contained' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default AddUpdateOrderPopUp
