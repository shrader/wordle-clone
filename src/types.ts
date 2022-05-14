/* 
 All types excpet for prop types will live here
*/

export interface LetterGuess {
  color: "yellow" | "gray" | "green",
  letter: string
};

export type WordGuess = LetterGuess[];

export type SetGuessesFunction = (value: React.SetStateAction<WordGuess[]>) => void;

export type SetStringFunction = React.Dispatch<React.SetStateAction<string>>
