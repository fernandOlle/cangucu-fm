import React from 'react';

const Player = () => {
  return (
    <div className='drop-shadow-[35_35px_35px_rgba(0,0,0,0.8)]'>
      <audio className='shadow-lg rounded-lg p-0 mb-8 w-full' controls autoPlay>
        <source src='http://r15.ciclano.io:4445/stream' type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Player;
