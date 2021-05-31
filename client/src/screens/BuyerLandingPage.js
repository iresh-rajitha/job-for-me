import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import BuyerNav from '../components/BuyerNav'
import Footer from '../components/Footer'
import AddUpdateOrderPopUp from '../components/AddUpdateOrderPopUp'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 0,
    padding: 10,
  },
})

const emails = ['username@gmail.com', 'user02@gmail.com']

const initialValues = {
  orderDetailID: 0,
  description: '',
  file: null,
  field: '',
  price: '',
  fileName: '',
}

const Order = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [order, setOrder] = useState(initialValues)
  const [selectedValue, setSelectedValue] = React.useState(emails[1])
  const [field, setField] = useState(0)

  const history = useHistory()
  console.log(history.location.state)
  const buyerId = history.location.state

  const handleClickOpen = () => {
    setOpen(true)
  }

  const illustration = () => {
    setField(1)
    console.log(field)
    setOpen(true)
  }

  const albumCovers = () => {
    setOpen(true)
    setField(2)
  }

  const vectorArts = () => {
    setOpen(true)
    setField(3)
  }

  const photoEditing = () => {
    setOpen(true)
    setField(4)
  }

  const videoEditing = () => {
    setOpen(true)
    setField(5)
  }

  const uiDesigning = () => {
    setOpen(true)
    setField(6)
  }

  const handleClose = (value) => {
    setOpen(false)
    console.log('refresh')
    // refreshOrderTable();
  }

  return (
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className='container'>
        <div></div>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}></Grid>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1579762593175-20226054cad0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1107&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Illustration
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  An illustration is a decoration, interpretation or visual
                  explanation of a text, concept or process, designed for
                  integration in print and digital published media, such as
                  posters, flyers, magazines, books, teaching materials,
                  animations, video games and films. An illustration is
                  typically created by an illustrator.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={illustration}>
                Place Order
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1542539097-00f1e264494f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Album Covers
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Besides the practicalities of identifying specific records,
                  album covers serve the purpose of advertising the musical
                  contents on the LP, through the use of graphic design,
                  photography, and/or illustration. An album cover normally has
                  the artist's name, sometimes in logo form; and the album
                  title.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={albumCovers}>
                Place Order
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1115&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Vector Arts
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Vector artwork is art that's made up of vector graphics. These
                  graphics are points, lines, curves and shapes that are based
                  on mathematical formulas. When you scale a vector image file,
                  it isn't low resolution and there's no loss of quality, so it
                  can be sized to however large or small you need it to be.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={vectorArts}>
                Place Order
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1548101977-da6da849636b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Photo Editing
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Photo editors review and select photos for promotion,
                  publication, and dissemination. They identify relevant images,
                  edit photos to make them more appealing, and arrange them in a
                  suitable layout. Photo editors also assign projects to
                  photographers to meet the organization's photography needs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={photoEditing}>
                Place Order
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1607112812619-182cb1c7bb61?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Video Editing
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Video editors manipulate film and video footage to create a
                  coherent and complete project that accurately depicts the film
                  directors envision. They use complex editing software to piece
                  together stills, footage, sound effects, dialog, and animation
                  effects.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={videoEditing}>
                Place Order
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='140'
                image='https://images.unsplash.com/photo-1571101628768-6bae026844b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  UI Designing
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  User interface (UI) design is the process designers use to
                  build interfaces in software or computerized devices, focusing
                  on looks or style. Designers aim to create interfaces which
                  users find easy to use and pleasurable. UI design refers to
                  graphical user interfaces and other forms—e.g.,
                  voice-controlled interfaces
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size='small' color='primary' onClick={uiDesigning}>
                Place Order
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <AddUpdateOrderPopUp
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          order={order}
          senderId={buyerId}
          field={field}
        />
      </section>
      <Footer />
    </Fragment>
  )
}

export default Order
