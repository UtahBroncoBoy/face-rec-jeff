import React from 'react';
import './FaceRecognition.css';
import BoundingBox from './BoundingBox';

const FaceRecognition = ({ imageURL, boxes }) => {
  console.log('boxes variable from FaceRecognition.js', boxes);
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' width='500px' height='auto'/>
        {boxes.map(box => BoundingBox(box))}
      </div>
    </div>
  )
}

export default FaceRecognition;