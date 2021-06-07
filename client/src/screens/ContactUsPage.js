import React, { Fragment, useState } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import sendEmail from '../actions/Email'
import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const ContactUs = () => {
  const classes = useStyles()

  const [formData, setFromData] = useState({
    subject: '',
    email: '',
    body: '',
    signature: '',
  })

  const { subject, email, body, signature } = formData

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    // e.preventDefault()

    sendEmail(subject, email, body, signature)
  }

  return (
    <Fragment>
      <LandingNav />
      <section className='container'>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <img
              src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941'
              alt='jobforme'
            />

            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Subject'
                type='text'
                placeholder='Subject'
                name='subject'
                value={subject}
                onChange={(e) => onChange(e)}
                required
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Email Address'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Enter your message body'
                type='text'
                placeholder='Enter your Message Body'
                name='body'
                value={body}
                onChange={(e) => onChange(e)}
                minLength='3'
                multiline
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Signature'
                type='text'
                placeholder='Signature'
                name='signature'
                value={signature}
                onChange={(e) => onChange(e)}
                required
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                style={{ color: 'green' }}
                className={classes.submit}
              >
                Send
              </Button>
            </form>
          </div>
        </Container>
      </section>
      <Footer />
    </Fragment>
  )
}

export default ContactUs
