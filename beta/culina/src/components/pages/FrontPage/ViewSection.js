import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../App.css';
import './css/ViewSection.css';
import './css/Button.css';

function ViewSection() {
  let history = useHistory();

  return (
    <div className='hero-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>COOKING AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <button className='btn btn--outline btn--large' href='/sign-in' onClick={() => {history.push('/sign-in')}}>SIGN IN</button>

        <button className='btn btn--outline btn--large' href='/sign-up' onClick={() => {history.push('/sign-up')}}>SIGN UP</button>
      </div>
    </div>
  );
}

export default ViewSection;
