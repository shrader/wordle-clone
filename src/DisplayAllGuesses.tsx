import React, {useEffect, useState} from 'react';
import * as type from './types';
import { v4 as uuidv4 } from 'uuid';

function SingleGuess({guess}:{guess:type.WordGuess}) {
  
  // return <span key={uuidv4()} style={{backgroundColor:props.color, padding:10}}>{props.letter}</span>
  return (
    <>
    {guess.map(props => {
      return (
        <span key={uuidv4()} style={{backgroundColor:props.color}}>
        {props.letter}
      </span>
      );})}
      </>
  );
}

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