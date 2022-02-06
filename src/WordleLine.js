import WordleTile from "./WordleTile";
export default function WordleLine(props) {
    const {lineWord, targetWord, newLine} = props;

    const title = props.title ?? false;

    let word = lineWord.split("")
    if (newLine) word = word.concat(new Array(targetWord.length - lineWord.length).fill(" "))

    //New Method
    let wordArray = []
    if (title) {
        wordArray = word.map((char, index) => {return {type: 'Title', letter: char}})
    } else if (newLine) {
        wordArray = word.map((char, index) => {return {type: (char === ' ' ? 'Empty' : 'Input'), letter: char}})
    } else {
        wordArray = Array(word.length).fill(" ");
        let targetWordArray = targetWord.split("")
        for (let index = 0; index < word.length; index++) {
            let char = word[index];
            if (char !== ' ') {
                if (word[index] === targetWordArray[index]) {
                    targetWordArray[index] = " ";
                    wordArray[index] = {type: 'Correct', letter: char};
                }
            } else {
                wordArray[index] = {type: 'Empty', letter: char};
            }
        }
        for (let index = 0; index < word.length; index++) {
            let char = word[index];
            if (wordArray[index] === ' ') {
                let foundIndex = targetWordArray.findIndex((char) => char === word[index]);
                if (foundIndex > -1) {
                    targetWordArray[foundIndex] = " ";
                    wordArray[index] = {type: 'Present', letter: char};
                } else {
                    wordArray[index] = {type: 'Absent', letter: char};
                }
            }
        }
    }

    /*const wordArray = word.map((char, index) => {
        let type = 'Absent'
        if (title) {
            type = 'Title';
        } else if (char === ' ') {
            type = 'Empty'
        } else if (newLine) {
            type = 'Input'
        } else {
            if (targetWord[index] === char) {
                type = 'Correct'
            } else if (targetWord.includes(char)) {
                type = 'Present'
            }
        }
        return {type: type, letter: char}
    })*/
    let css = {display: 'flex', 
            flexDirection:'row', 
            justifyContent:'center', 
            gap:'6px'}
    
    if (title) css.marginBottom = 6;
    if (title) css.marginTop = 6;

    return <div style={css}>{wordArray.map(({type, letter}, index) => {
        return <WordleTile text={letter} type={type} key={index} index={index} length={wordArray.length}/>
    })}</div>
}