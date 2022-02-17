import { readFileSync, writeFileSync } from "fs";

const file = readFileSync('custom-wordle/src/Words.txt', 'utf8')
const words = file.split('\n');


const minWordLength = 1;
const maxWordLength = 5;

writeFileSync(`custom-wordle/src/words/RDLE-Words.json`, '[' + words.filter((word) => (word.length <= maxWordLength) && (word.length >= minWordLength)).filter((word) => {
    return word.slice(-3) === 'ord'
}).map((word) => `"${word}le"`).join(", ") + ']');

/*for (let wordLength = minWordLength; wordLength < maxWordLength; wordLength++) {
    writeFileSync(`custom-wordle/src/words/${wordLength}-Letter-Words.json`, '[' + words.filter((word) => word.length === wordLength).map((word) => `"${word}"`).join(", ") + ']');
}

console.log(words)*/
