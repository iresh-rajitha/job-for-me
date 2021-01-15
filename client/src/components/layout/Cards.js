import React from 'react';
import './Style/Cards.css';
import CardItem from './CardItem';


function Cards() {
  return (
    <div className='cards'>
      <h1>ENJOY WITH OUR SERVICES</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-12.jpg'
              text='Pay your bill using QR code with master.PAY'
              label='Easy pay' 
            />  
            
            <CardItem
              src='images/img-11.jfif'
              text='Being safty with master.PAY '
              label='Safty'
            />
          </ul>
          
          <ul className='cards__items'>
            <CardItem
              src='images/img-13.jpg'
              text='Save your bill details in proper way with master.PAY'
              label='Payment history'
            />
            <CardItem
              src='images/img-14.jpg'
              text='Check your expenses with master.PAY'
              label='Adventure'
            />
            <CardItem
              src='images/img-16.jpeg'
              text='Enjoy the  offers using master.PAY'
              label='Offers & pramotios'

            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;