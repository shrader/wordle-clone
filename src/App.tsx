import React, {useEffect, useState} from 'react';
import * as API from './Api';
import * as type from './types';
import * as helpers from './helpers';
// import WordDisplay from './WordDisplay';
import './App.css';

function GameContainer({answer}:{answer:string}) {
  const [guesses, setGuesses] = useState<type.WordGuess[]>([]);
  const [testChars, setTestChars] = useState("");

  let tempStr = "";

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

  const mapGuesses = (guessArr:type.WordGuess[]) => {
    guessArr.map(guess => {
      return guess.map(props => {
        return <span style={{backgroundColor:props.color, padding:10}}>{props.letter}</span>
      })
    })
  }

  useEffect(() => {

    document.addEventListener('keydown', handleKeyEvent);   

    return function cleanup() {
      console.log("UNMOUNTING: removing event listener");
      window.removeEventListener("keydown", handleKeyEvent);
      };
  
  } ,[])

  return (
    <>
    {testChars}

    </>
  );
}

function App() {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAndSetNewWord = async () => {
      try {
        const newWord = await API.getNewWord();
        setAnswer(newWord.toUpperCase());
        setIsLoading(false);
      } catch(e) {
        console.error(e);
        setAnswer('START'); // start is just for testing when/if getNewWord fails
        setIsLoading(false); 
      }
    }

    getAndSetNewWord();
  } ,[])

  return (
    <div className="App">
      <header className="App-header">
        {isLoading? <p>Loading...</p>:<GameContainer answer={answer}/>}
      </header>
    </div>
  );

}

export default App;
