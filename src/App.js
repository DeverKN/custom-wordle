import './App.css';
import WordleGame from './WordleGame';
import { WordleCreator } from "./WordleCreator";
import { wordleBank, extraWords } from './WordBanks';
import { randomArrayElement } from './Utilities';

const defaultTitle = 'YORDLE';
//const maxGuesses = 9;
const defaultGuesses = 5;
const defaultWordLength = 5;
const minWordLength = 1;
const maxWordLength = 21;

function App() {
  const queryParams = new URLSearchParams(window.location.search)
  //const wordBank = queryParams.get("wordBank") ?? 
  const create = (queryParams.get("create") ?? false)
  const wordBankType = (queryParams.get("word_bank_type") ?? 'default').toLowerCase()
  let wordBank = [];
  let wordBankLength = 0;
  if (wordBankType === 'default') {
    wordBankLength = Math.min(Math.max((queryParams.get("word_bank_length") ?? defaultWordLength), minWordLength), maxWordLength)
    const originalWordleWordLength = 5;
    if (wordBankLength === originalWordleWordLength) {
      wordBank = wordleBank.concat(extraWords);
    } else {
      wordBank = require(`./words/${wordBankLength}-Letter-Words.json`);
    }
  } else {
    wordBank = queryParams.get("word_bank").split(",");
    wordBankLength = wordBank[0].length;
    if (wordBank.some((word) => word.length !== wordBankLength)) wordBank = wordleBank.concat(extraWords);
    wordBankLength = wordBank[0].length;
  }

  let paramWord = queryParams.get("word")
  const base64Word = queryParams.get("encoded") ?? false;
  if (base64Word) paramWord = btoa(paramWord);
  let word = ""
  if (paramWord !== null) {
    if (wordBank.includes(paramWord.toLowerCase())) {
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
    word = randomArrayElement(wordBank).toUpperCase();
  }
  const title = (queryParams.get("title") ?? defaultTitle).toUpperCase()
  const numGuesses = /*Math.min(*/queryParams.get("num_guesses") ?? defaultGuesses/*, maxGuesses)*/
  /*const [targetWord, ] = useState(word)*/
  return (
    <div className="App">
      <header className="App-header">
        {create && <WordleCreator/>}
        <WordleGame title={title} targetWord={word} wordLength={wordBankLength} wordBank={wordBank} numGuesses={numGuesses} active={!create}/>
      </header>
    </div>
  );
}

export default App;
