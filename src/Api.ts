import axios from 'axios';
import {RAPID_API_KEY} from './secrets/secrets'

export const getNewWord = async (wordLength=5) => {
  const wordsApiURL = `https://random-words5.p.rapidapi.com/getRandom`;
  const resp = await axios.get(wordsApiURL, {
    headers: {
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
      // get your own Key from https://rapidapi.com/sheharyar566/api/random-words5/
      'X-RapidAPI-Key': RAPID_API_KEY
    },
    params: {
      wordLength: `${wordLength}`
    }
  });
  return resp.data
}

export const wordIsValid = async (word:string) => {
  const dictionaryApiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const resp = await axios.get(dictionaryApiURL);
    console.log('dictionaryAPI response: ', resp.data);
    if (resp.data[0].word) {
      return true;
    }
    return false
  } catch (error:any) {
    console.log(error.response.data.error);
  }
}
