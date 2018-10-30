import React from 'react';

const Rank = ({ name, entries}) => {
  return(
    <div>
      <div className='white f3'>
        {`${name}, you have detected faces in ${entries} photos!!`}
      </div>
    </div>
  );
}

export default Rank;