import React from 'react';

const imageUrl = process.env.REACT_APP_IMAGE_URL || 'localhost/dailyimage'

const DailyImage = () => {
  return (
    <div>
      <img style={{ borderRadius: '5%' }} className="image" width='300' height='300' src={`http://192.168.1.198:8081/dailyimage`} alt='dailypic' />
    </div>
  )
};

export default DailyImage;
