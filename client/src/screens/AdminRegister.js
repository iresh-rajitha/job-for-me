import React, { Fragment } from 'react'

import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'
import AddAnAdmin from '../components/AdminRegister'

const AdminRegister = () => {
  return (
    <Fragment>
      <LandingNav />
      <section className='container'>
        <AddAnAdmin />
      </section>
      <Footer />
    </Fragment>
  )
}

export default AdminRegister
