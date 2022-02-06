import { readFileSync, writeFileSync } from "fs";

const file = readFileSync('custom-wordle/src/Words.txt', 'utf8')
const words = file.split('\n');

const minWordLength = 1;
const maxWordLength = 25;

for (let wordLength = minWordLength; wordLength < maxWordLength; wordLength++) {
    writeFileSync(`custom-wordle/src/words/${wordLength}-Letter-Words.json`, '[' + words.filter((word) => word.length === wordLength).map((word) => `"${word}"`).join(", ") + ']');
}

console.log(words)
