import React from 'react';

const Player = () => {
  return (
    <div>
      <audio className='shadow-lg rounded-lg p-0 mb-8 w-full' controls autoplay>
        <source src='http://r15.ciclano.io:4445/stream' type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Player;
