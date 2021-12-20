import React from 'react';

const Player = ({ playing }) => {
  return (
    <div className='drop-shadow-2xl'>
      <audio className='drop-shadow-2xl rounded-lg p-0 mb-8 w-full' controls>
        <source src='http://r15.ciclano.io:4445/stream' type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Player;
