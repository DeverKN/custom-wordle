import './App.css';
import WordleGame from './WordleGame';
import { wordleBank, extraWords } from './WordBanks';
import { randomArrayElement } from './Utilities';
import { useState } from 'react';

/*        
<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/
const defaultTitle = 'YORDLE';
//const maxGuesses = 9;
const defaultGuesses = 5;
const defaultWordLength = 5;
const minWordLength = 1;
const maxWordLength = 21;

function App() {
  const queryParams = new URLSearchParams(window.location.search)
  //const wordBank = queryParams.get("wordBank") ?? 
  const wordBankType = (queryParams.get("word_bank_type") ?? 'default').toLowerCase()
  let wordBank = [];
  let wordBankLength = 0;
  if (wordBankType === 'default') {
    wordBankLength = Math.min(Math.max((queryParams.get("word_bank_length") ?? defaultWordLength), minWordLength), maxWordLength)
    console.log(wordBankLength)
    const originalWordleWordLength = 5;
    if (wordBankLength === originalWordleWordLength) {
      wordBank = wordleBank.concat(extraWords);
    } else {
      wordBank = require(`./words/${wordBankLength}-Letter-Words.json`);
    }
  } else {
    wordBank = queryParams.get("word_bank").split(",")
    wordBankLength = wordBank[0].length();
  }
  //const wordBank = (queryParams.get("word_bank")
  const paramWord = queryParams.get("word")
  let word = ""
  if (paramWord !== null) {
    console.log(paramWord);
    if (!wordBank.includes(paramWord)) {
      word = paramWord.toUpperCase();
    } else {
      if (!isNaN(paramWord)) {
        const index = Math.min(parseInt(paramWord), wordBank.length - 1)
        word = wordBank[index].toUpperCase();
      } else {
        word = randomArrayElement(wordBank).toUpperCase();
      }
    }
  } else {
    console.log("rand");
    word = randomArrayElement(wordBank).toUpperCase();
  }
  const title = (queryParams.get("title") ?? defaultTitle).toUpperCase()
  const numGuesses = /*Math.min(*/queryParams.get("num_guesses") ?? defaultGuesses/*, maxGuesses)*/
  const [targetWord, setTargetWord] = useState(word)
  return (
    <div className="App">
      <header className="App-header">
        <WordleGame title={title} targetWord={targetWord} wordLength={wordBankLength} wordBank={wordBank} numGuesses={numGuesses}/>
      </header>
    </div>
  );
}

export default App;
