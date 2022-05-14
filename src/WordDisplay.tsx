import React, {useEffect, useState} from 'react';
// import * as types from './types';

interface props {
  words: string
}

function WordDisplay({words}:props) {

  useEffect(() => {
    console.log("currValue: ",words);
  } ,[words])
  
  return (
    <>
      <p>
        {words.split('')}
      </p>
      {/* <p>
        TEST
      </p>
      <p>
        TEST
      </p>
      <p>
        TEST
      </p>
      <p>
        TEST
      </p> */}
    </>
  )
}

export default WordDisplay;
