import * as type from './types';
import * as API from './Api';
import { types } from 'util';

export const freqCounter = (str:string) => {
  const freqs: { [key: string]: number } = {};
  const strArr = str.split('');
  for (let char of strArr) {
    freqs[char] = (freqs[char] + 1) || 1;
  }
  return freqs;
}

export const charIsValid = (char: string) => {
  return /^[a-zA-Z]+$/.test(char);
}

const allLettersAreGreen = (guess:type.WordGuess) => {
  for (let letterProps of guess) {
    if (letterProps?.color !== type.Colors.Green) return false;
  }
  return true
}

 const scoreLetters = (wordGuess:string, answer:string) => {
  const guessLetters = wordGuess.split('');
  const answerLetters = answer.split('');
  console.log('answer arr: ', answerLetters);
  console.log('guess arr: ', guessLetters);
  const answerLetterFrequencies = freqCounter(answer);
  const letterGuessArr:type.WordGuess = [];

  for (let idx=0; idx < guessLetters.length; idx++ ) {
    const submittedLetter = guessLetters[idx];
    const correctLetter = answerLetters[idx];

    if (submittedLetter === correctLetter) {
      const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:type.Colors.Green};
      answerLetterFrequencies[submittedLetter]--;
      letterGuessArr.push(letterGuessObj);
      continue
    }
    /* 
    If the submitted letter at this idx isn't the same as the answer letter but the submitted letter is in the answer
    and it hasn't been matched already, then assign yellow
    */
    if (submittedLetter in answerLetterFrequencies && answerLetterFrequencies[submittedLetter]) {
      const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:type.Colors.Yellow};
      answerLetterFrequencies[submittedLetter]--;
      letterGuessArr.push(letterGuessObj);
      continue
    }
    const letterGuessObj:type.LetterGuess = {letter:submittedLetter, color:type.Colors.DarkGray};
    letterGuessArr.push(letterGuessObj);
  }
  return letterGuessArr
}

export const handleWordSubmit = async (wordGuess:string, answer:string, setGuessFunc:type.SetGuessesFunction) => {
  const wordIsValid = await API.wordIsValid(wordGuess);
  if (wordIsValid) {
    const scoredLetters = scoreLetters(wordGuess, answer);
    setGuessFunc(guesses => {
      console.log('adding scored letters to guesses: ', scoredLetters);
      return [...guesses, scoredLetters]
    })
    if (allLettersAreGreen(scoredLetters)) {
      console.log('YOU WIN!!! CONGRATS!');
      // have actual win function that shows confetti or something
    }
    // add to word/guess array
    // if (guesses.length <= 5 || all letters green) scoreGame();
  }
}


