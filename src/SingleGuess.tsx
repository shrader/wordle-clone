import React from 'react';
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

export default SingleGuess;
