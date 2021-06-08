import { Fragment } from 'react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Button } from '@material-ui/core'

import BuyerGigForm from '../components/BuyerGigForm'
import BuyerGigList from '../components/BuyerGigList'
import BuyerNav from '../components/BuyerNav'
import Footer from '../components/Footer'
import Popup from '../components/Popup'

function Orderpage() {
  let history = useHistory()
  const senderId = history.location.state
  const buyerId = history.location.state
  const [currentId, setCurrentId] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)
  const [userId, setUserId] = useState(false)
  console.log(senderId)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
  }, [history])

  const openGigForm = () => {
    if (!history.location.state) {
      history.push('/login')
    }
    setUserId(history.location.state)
    setOpenPopup(true)
  }
  return (
    <Fragment>
      <BuyerNav {...{ buyerId }} />
      <section className='container'>
        <div>
          <Popup
            title='Add an Order'
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <BuyerGigForm
              {...{ userId, currentId, setCurrentId, setOpenPopup }}
            />
          </Popup>
          <BuyerGigList buyerId={buyerId} senderId={history.location.state} />
          <Grid container justify='flex-end'>
            <Button
              onClick={openGigForm}
              variant='contained'
              style={{ color: 'green' }}
            >
              Place another order!
            </Button>
          </Grid>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
export default Orderpage
