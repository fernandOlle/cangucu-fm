import React from 'react';

const Player = ({ playing }) => {
  return (
    <div className='shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-3'>
      <audio className='shadow-2xl rounded-lg p-0 mb-8 w-full' controls>
        <source src='http://r15.ciclano.io:4445/stream' type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Player;
