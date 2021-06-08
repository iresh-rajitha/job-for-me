import React from 'react'
import { Link } from 'react-router-dom'

const Navigationbar = (props) => {
  return (
    <nav className='navbar '>
      <h1>
        <Link
          to={{
            pathname: '/admin',
            state: props.adminId,
          }}
        >
          <img
            className='photo'
            src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941'
            alt='jobforme'
          />
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Logout</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/adminprofile',
              state: props.adminId,
            }}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigationbar
