import WordleTile from "./WordleTile";
export default function WordleLine(props) {
    const {lineWord, targetWord, newLine} = props;

    let word = lineWord.split("")
    if (newLine) word = word.concat(new Array(targetWord.length - lineWord.length).fill(" "))
    const wordArray = word.map((char, index) => {
        let type = 'Absent'
        if (char === ' ') {
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
    })
    let css = {display: 'flex', 
            flexDirection:'row', 
            justifyContent:'center', 
            width:'1000px',
            gap:'6px'}
    return <div style={css}>{wordArray.map(({type, letter}, index) => {
        return <WordleTile delay={type !== 'Input' ? (450 * index) : 0} text={letter} type={type} key={index}/>
    })}</div>
}