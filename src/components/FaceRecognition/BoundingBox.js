import React from 'react';

export default box => (
  <div>
    <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
  </div>
)
