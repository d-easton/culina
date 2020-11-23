import React from 'react';
import './css/Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Meals!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore your unawakened pallet as you dive into this cake'
              label='Dessert'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Be filled with the smoky sensation of rib eye'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean as you dive into this luxurious salmon'
              label='Luxury'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='CRUNCH into the most amazing breakfast sandwich you have ever had'
              label='Experience'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='TASTE the rich pasta as it melts in your mouth'
              label='SAVORY'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
