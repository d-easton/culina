import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './css/Footer.css';
import './css/Button.css';

const Footer = (props) => {
  let history = useHistory();
  const { email } = props;

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Upgrade your cookbook with Culina. Get started today.
        </p>
        <div className='input-areas'>
          {email ? (<> 
            {/* <button className='btn btn--outline btn--large' href='/sign-up' onClick={() => {history.push('/sign-up')}}>SIGN UP</button> */}
          </>) : (<> 
            <button className='btn btn--outline btn--large' href='/sign-up' onClick={() => {history.push('/sign-up')}}>SIGN UP</button>
          </>)}
        </div>
      </section>
      {/* <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/about-us'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div> */}
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              Culina
              <i class='fas fa-stroopwafel' />
            </Link>
          </div>
          <small class='website-rights'>Culina © 2020</small>
          {/* <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default Footer;
