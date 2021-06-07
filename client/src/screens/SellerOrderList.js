import React, { useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import SellerNav from '../components/SellerNav'
import Footer from '../components/Footer'
import SellerGigList from '../components/SellerGigList'

function SellerOrderpage() {
  let history = useHistory()
  const sellerId = history.location.state

  const senderId = history.location.state
  console.log(senderId)

  useEffect(() => {
    if (!history.location.state) {
      history.push('/login')
    }
  }, [history.location.state])

  return (
    <Fragment>
      <SellerNav {...{ sellerId }} />
      <section className='container'>
        <div>
          <SellerGigList
            sellerId={sellerId}
            senderId={history.location.state}
          />
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
export default SellerOrderpage
