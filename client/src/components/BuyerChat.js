import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { Grid, TextField, withStyles, Button } from '@material-ui/core'
import * as actions from '../actions/messages'

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
  messageID: 0,
  to: 0,
  from: 0,
  text: '',
  sentAt: new Date(),
}

const MessagesForm = ({ classes, ...props }) => {
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})
  const { addToast } = useToasts()
  console.log('from ' + props.senderId)
  console.log('to ' + props.recieverId)

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('text' in fieldValues)
      temp.text = fieldValues.text ? '' : 'This field is required.'
    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
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
  }

  const setRecieverId = (fieldValues = values) => {
    fieldValues.to = props.recieverId
  }

  const setSenderId = (fieldValues = values) => {
    fieldValues.from = props.senderId
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSenderId()
    setRecieverId()
    if (validate()) {
      const onSuccess = () => {
        resetForm()
        props.fetchAllMessages()
        addToast('Submitted successfully', { appearance: 'success' })
      }
      if (props.currentId === 0) {
        props.createMessage(values, onSuccess())
        props.fetchAllMessages()
      } else {
        props.updateMessage(props.currentId, values, onSuccess())
        props.fetchAllMessages()
      }
    }
  }

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.messageList.find((x) => x.messageId === props.currentId),
      })
      setErrors({})
      props.fetchAllMessages()
    }
  }, [props])

  return (
    <Fragment>
      <section className='container'>
        <form
          autoComplete='off'
          noValidate
          className={classes.root}
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name='text'
                variant='outlined'
                label='Message'
                value={values.text}
                onChange={handleInputChange}
                {...(errors.text && {
                  error: true,
                  helperText: errors.text,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  className={classes.smMargin}
                >
                  Send
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
  messageList: state.messages.list,
})

const mapActionToProps = {
  createMessage: actions.create,
  updateMessage: actions.update,
  fetchAllMessages: actions.fetchAll,
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MessagesForm))
