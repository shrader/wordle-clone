import React, {useEffect, useState, useCallback} from 'react';
import * as API from './Api';
import * as type from './types';
import * as helpers from './helpers';
import WordDisplay from './WordDisplay';
import './App.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [guesses, setGuesses] = useState<type.WordGuess[]>([]);
  const [testChars, setTestChars] = useState("");
  
  const getAndSetNewWord = useCallback(async () => {
    
    try {
      const newWord = await API.getNewWord();
      setAnswer(newWord.toUpperCase());
      setIsLoading(false);
      console.log('answer!!! ', answer);
    } catch(e) {
      console.error(e);
      setAnswer('START'); // start is just for testing when/if getNewWord fails
      setIsLoading(false); 
    }
  }, [])

  function SubApp({answer}:{answer:string}) {

    useEffect(() => {
      if (!isLoading) {
        console.log("answer: ", answer);
      } else {
        console.log('still loading...');
      }
  
      document.addEventListener('keydown', handleKeyEvent);   
  
      return function cleanup() {
        console.log("UNMOUNTING: removing event listener");
        window.removeEventListener("keydown", handleKeyEvent);
        };
    
    } ,[])

    return (
      <div className="App">
        <header className="App-header">
          {isLoading? <p>Loading...</p>:<GameContainer />}
        </header>
      </div>
    );
  }


  function GameContainer() {

    function WordDisplayContainer() {
      return (
        <>
        {guesses.map(guess => {
          <GuessDisplay guess={guess} />
        })}
        </>
      );
    }
  
    interface GuessDisplayPropa {
      guess: type.WordGuess
    }
  
    function GuessDisplay({guess}:GuessDisplayPropa) {
      return (
        <p>
         {guess.map(guess => {
          return <span style={{backgroundColor:guess.color, padding:'5px'}}>{guess.letter}</span>
        })}
        </p>
      )
    }

    return (
      <>
        <WordDisplayContainer />
        <WordDisplay words={testChars} />
      </>
    )
  }

  let tempStr = ""

  function handleKeyEvent(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (key === 'BACKSPACE') {
      tempStr = tempStr.slice(0, -1);
      setTestChars(tempStr);
      return
    }
    if (key === 'ENTER' && tempStr.length === 5) {
      console.log('answer in handle key event: ', answer);
      helpers.handleWordSubmit(tempStr, answer, setGuesses);
      tempStr = "";
      setTestChars(tempStr);
      console.log('guesses:', guesses);
      return
    }
    if (tempStr.length >= 5 || key.length >= 5) {
      console.log('Only 5 letter words plz :)');
      return
    }
    if (helpers.charIsValid(key)) {
      tempStr += key;
      setTestChars(tempStr);
      return
    }
    console.log('Invalid entry');
    return
  }

  // const memoizedHandleKeyEvent = useCallback(handleKeyEvent, [answer]);

  useEffect(() => {
    getAndSetNewWord();
    setTimeout(()=>{},10000);
    if (!isLoading) {
      console.log("answer: ", answer);
    } else {
      console.log('still loading...');
    }

    document.addEventListener('keydown', handleKeyEvent);   

    return function cleanup() {
      console.log("UNMOUNTING: removing event listener");
      window.removeEventListener("keydown", handleKeyEvent);
      };
  
  } ,[getAndSetNewWord])

  console.log("answer: ", answer);

  return <SubApp answer={answer} />

}

export default App;
