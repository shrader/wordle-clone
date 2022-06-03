import React, {useEffect, useState} from 'react';
import * as API from './Api';
import GameContainer from './GameContainer';
import './App.css';

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
    <>
      <div className="App">
        <header className="App-header">
          Wordle Clone
        </header>
      </div>
      <div className="App">
        {isLoading? <p>Loading...</p>:<GameContainer answer={answer}/>}
      </div>
    </>
  );

}

export default App;
