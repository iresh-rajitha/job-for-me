import React from 'react'
import { Link } from 'react-router-dom'

const Navigationbar = (props) => {
  return (
    <nav className='navbar '>
      <h1>
        <Link
          to={{
            pathname: '/sellerdashboard',
            state: props.sellerId,
          }}
        >
          {/* <i class="fas fa-comments-dollar"></i> JobForMe */}
          <img
            className='photo'
            src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941'
            alt='jobforme'
          />
        </Link>
      </h1>
      <ul>
        {/* <li>
          <a href="/admin">Admin Panel</a>
        </li>
        <li>
          <a href="/order">Order a Service</a>
        </li> */}
        {/* <li>
          <a href="/seller">Become a Seller</a>
        </li> */}
        {/* <li>
          <Link to="/register">Register</Link>
        </li> */}

        <li>
          <Link
            to={{
              pathname: '/sellercontact',
              state: props.sellerId,
            }}
          >
            Contact Admin
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: '/sellerprofile',
              state: props.sellerId,
            }}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link to='/'>Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigationbar
