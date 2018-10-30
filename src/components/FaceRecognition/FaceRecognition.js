import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' width='500px' height='auto'/>
      </div>
    </div>
  )
  
}

export default FaceRecognition;