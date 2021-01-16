import React from 'react';

const imageUrl = process.env.REACT_APP_IMAGE_URL || 'localhost/dailyimage'

const DailyImage = () => {
  return (
    <div>
      <img className="image" width='300' height='300' src={`http://${imageUrl}`} alt='dailypic' />
    </div>
  )
};

export default DailyImage;
