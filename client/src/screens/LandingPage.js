import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import LandingNav from '../components/LandingNav'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <Fragment>
      <LandingNav />

      <section className='landing'>
        {/* <video
        src="/video/Person Working on an Apple MacBook.mp4"
        autoplay
        loop
        muted
      ></video> */}
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>
              <img
                className='landinglogo'
                src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941'
                alt='jobforme'
              />
            </h1>
            <p className='lead'>Freelancing opportunity to all of you!</p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-primary'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  )
}

export default Landing
