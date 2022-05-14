import * as type from './types';
import * as API from './Api';

export const freqCounter = (str:string) => {
  console.log('start frequency counter');
  console.log('given string ', str)
  const freqs: { [key: string]: number } = {};
  const strArr = str.split('');
  console.log('str Arr', strArr);
  for (let char of strArr) {
    freqs[char] = (freqs[char] + 1) || 1;
    console.log('char: ', char);
    console.log('freqs:', freqs);
  }
  return freqs;
}

export const charIsValid = (char: string) => {
  return /^[a-zA-Z]+$/.test(char);
}

const allLettersAreGreen = (guess:type.WordGuess) => {
  for (let letterProps of guess) {
    if (letterProps?.color !== 'green') return false;
  }
  return true
}

 const scoreLetters = (wordGuess:string, answer:string) => {
  const guessLetters = wordGuess.split('');
  const answerLetters = answer.split('');
  console.log('answer arr: ', answerLetters);
  console.log('guess arr: ', guessLetters);
  // const wordGuessLetterFrequencies = freqCounter(wordGuess);
  console.log('answer inside scoreLetters ', answer);
  const answerLetterFrequencies = freqCounter(answer);
  console.log('answerFreqs ',answerLetterFrequencies);
  const letterGuessArr:type.WordGuess = [];

  for (let idx=0; idx < guessLetters.length; idx++ ) {
    console.log('idx: ',idx);
    const submittedLetter = guessLetters[idx];
    const correctLetter = answerLetters[idx];

    if (submittedLetter === correctLetter) {
      const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:'green'};
      // wordGuessLetterFrequencies[submittedLetter]--; 
      answerLetterFrequencies[submittedLetter]--;
      letterGuessArr.push(letterGuessObj);
      continue
    }
    /* 
    If the submitted letter at this idx isn't the same as the answer letter but the submitted letter is in the answer
    and it hasn't been matched already, then assign yellow
    */
    if (submittedLetter in answerLetterFrequencies && answerLetterFrequencies[submittedLetter]) {
      const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:'yellow'};
      // wordGuessLetterFrequencies[submittedLetter]--; 
      answerLetterFrequencies[submittedLetter]--;
      letterGuessArr.push(letterGuessObj);
      continue
    }
    const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:'gray'};
    letterGuessArr.push(letterGuessObj);
  }
  console.log('letter guess array:',letterGuessArr);
  return letterGuessArr
}

export const handleWordSubmit = async (wordGuess:string, answer:string, setGuessFunc:type.SetGuessesFunction) => {
  console.log('answer from inside handleWordSubmit: ', answer);
  const wordIsValid = await API.wordIsValid(wordGuess);
  if (wordIsValid) {
    const scoredLetters = scoreLetters(wordGuess, answer);
    setGuessFunc(guesses => {
      return [...guesses, scoredLetters]
    })
    console.log('SCORED_LETTERS: ', scoredLetters);
    if (allLettersAreGreen(scoredLetters)) {
      console.log('YOU WIN!!! CONGRATS!');
      // have actual win function that shows confetti or something
    }
    // add to word/guess array
    // if (guesses.length <= 5 || all letters green) scoreGame();
  }
}

