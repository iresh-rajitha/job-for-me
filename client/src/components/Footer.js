import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          JobForMe! For free! Earn Free!
        </p>
        <p className='footer-subscription-text'>
          You can contact our admin panel at any time of your preference!
        </p>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              {/* JobForMe
              <i class="fas fa-paper-plane" /> */}
              <img
                className='landinglogo'
                src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/765/4683342765_f43e76b4-4d93-4f52-b0e7-cc99ad1bf015.png?cb=1613721941'
                alt='jobforme'
              />
            </Link>
          </div>
          <small class='website-rights'>JobForMe © 2021</small>
          <div class='social-icons'>
            <a
              href='https://www.facebook.com/'
              className='social-icon-link '
              target='_blank'
              aria-label='Facebook'
              rel='nonreferrer'
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a
              href=' https://www.instagram.com/accounts/login/'
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
              rel='nonreferrer'
            >
              <i class='fab fa-instagram' />
            </a>
            <a
              href='https://www.youtube.com/'
              className='social-icon-link youtube'
              target='_blank'
              aria-label='Youtube'
              rel='nonreferrer'
            >
              <i class='fab fa-youtube' />
            </a>
            <a
              href='https://twitter.com/login?lang=en/'
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
              rel='nonreferrer'
            >
              <i class='fab fa-twitter' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
