import React from 'react';

const Player = () => {
  return (
    <div className='shadow-2xl drop-shadow-2xl '>
      <audio
        className='shadow-2xl drop-shadow-2xl rounded-lg mb-8 w-full'
        controls
        autoPlay
      >
        <source
          src='https://koqpwdekj182349.herokuapp.com/http://r15.ciclano.io:4445/stream'
          type='audio/mpeg'
        />
      </audio>
    </div>
  );
};

export default Player;
