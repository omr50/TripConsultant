import React, { useEffect, useState } from 'react';

interface childProps {
  hotelItem: any
}

const HotelCard: React.FC<childProps> = (props) => {

  // this hotel card will take the hotel picture, name
  // review rating and it will display it in a nice card.
  const name = props.hotelItem.name;
  const picture = props.hotelItem.images[0];
  
  return (
    <div className='hotel-card'>
      <img src={picture} className='hotel-carousel-image'></img>
      <p className='hotel-carousel-name'>{name}</p>
      {/* <p>{props.rating}</p> */}
    </div>
  )
}

export default HotelCard