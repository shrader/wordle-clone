import React from 'react';
import * as type from './types';
import { v4 as uuidv4 } from 'uuid';
import SingleGuess from './SingleGuess';

function DisplayAllGuesses({guesses}:{guesses:type.WordGuess[]}) {

  return (
    <>
    {guesses.map(guess => {
      return (
      <div key={uuidv4()}>
        <SingleGuess guess={guess} />
      </div>
      );
    })}
    </>
  )
}

export default DisplayAllGuesses;