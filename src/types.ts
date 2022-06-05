/* 
 All types excpet for prop types will live here
*/

export enum Colors {
  Yellow = "#b59f3b",
  Green = "#538d4e",
  DarkGray = "#3a3a3c",
  LightGray = "#818384",
}

export interface LetterGuess {
  color: Colors,
  letter: string
};

export type WordGuess = LetterGuess[];

export type SetGuessesFunction = (value: React.SetStateAction<WordGuess[]>) => void;

export type SetStringFunction = React.Dispatch<React.SetStateAction<string>>
