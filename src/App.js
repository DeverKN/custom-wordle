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

const wordBank = wordleBank.concat(extraWords);

function App() {
  const [targetWord, setTargetWord] = useState(randomArrayElement(wordleBank).toUpperCase())
  return (
    <div className="App">
      <header className="App-header">
        <WordleGame targetWord={targetWord} wordLength={targetWord.length} wordBank={wordBank} numGuesses={5}/>
      </header>
    </div>
  );
}

export default App;
