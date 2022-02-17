import { useEffect, useState } from "react";
import ToastNotifier from "./ToastNotifier";
import WordleKey from "./WordleKey";
import WordleBoard from "./WordleBoard";
import WordleLine from "./WordleLine";

export default function WordleGame(props) {
    const {title, targetWord, wordLength, numGuesses, hard, wordBank} = props;
    const [lines, setLines] = useState([])
    const [newLine, setNewLine] = useState('')
    const [nextToastID, setNextToastID] = useState(0)
    const [toastMessages, setToastMessages] = useState([])
    const [revealedLetters, setRevealedLetters] = useState([])
    const [boardSolved, setBoardSolved] = useState(false)
    const keyboardLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split("")
    const keyboardLetters1 = 'Q,W,E,R,T,Y,U,I,O,P'.split(",")
    const keyboardLetters2 = 'A,S,D,F,G,H,J,K,L'.split(",")
    const keyboardLetters3 = 'Z,X,C,V,B,N,M'.split(",")

    const handleKeyPress = ({key}) => {
        console.log(key)
        if (outOfGuesses() || boardSolved) {
            return;
        }
        console.log(targetWord)
        key = key.toUpperCase()
        if (key === 'BACKSPACE') {
            setNewLine(newLine.substring(0, newLine.length - 1))
        } else if (key === 'ENTER') {
            inputLine()
        } else if (keyboardLetters.includes(key)) {
            if (newLine.length < wordLength) setNewLine(newLine + key)
        }
    }

    const inputLine = () => {
        let wordChecked = checkWord(newLine, revealedLetters, wordLength, wordBank, hard);
        if (wordChecked.success) {
            let solved = (newLine === targetWord)
            setLines([...lines, {id: lines.length, text: newLine}])
            let checkedLetters = checkLetters(newLine, targetWord)
            setRevealedLetters([...checkedLetters, ...revealedLetters])
            setNewLine("")
            if (solved) {
                addToast('Correct!')
                setBoardSolved(true)
            } else if (getGuessesLeft() <= 1) {
                addToast(`Out of guesses! ${targetWord}`)
            }
        } else {
            addToast(wordChecked.errorMessage)
        }
    }

    const checkLetters = (wordToCheck, targetWord) => {
        console.log('Check' + wordToCheck)
        return wordToCheck.split("").map((letter, index) => {
            if (targetWord[index] === letter) {
                return {letter: letter, type: 'Correct'}
            } else if (targetWord.includes(letter)) {
                return {letter: letter, type: 'Present'}
            } else {
                return {letter: letter, type: 'Absent'}
            }
        })
    }

    const checkWord = (wordToCheck, revealedLetters, wordLength, wordBank, hard) => {
        if (wordToCheck.length === wordLength) {
            if (hard) {
                if (!revealedLetters.every(({letter, type}) => {
                    return ((type === 'Absent') || wordToCheck.includes(letter))
                })) {
                    return {success: false, errorMessage: `Must use all revealed letters`}
                }
            }
            if (wordBank.includes(wordToCheck.toLowerCase()) || wordToCheck === targetWord) {
                return  {success: true}
            } else {
                return {success: false, errorMessage: `Not a valid word`}
            }
        } else {
            return {success: false, errorMessage: `Too short`}
        }
    }

    const maxToastMessagesLength = 10;

    const addToast = (message) => {
        if (toastMessages.length < maxToastMessagesLength) {
            setToastMessages(toastMessages.concat([{message: message, id: nextToastID}]))
            setNextToastID(nextToastID + 1)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (handleKeyPress), {passive : false})
        return (() => {
            document.removeEventListener('keydown', handleKeyPress)
        })
    })

    const keyboardMap = (letter) => {
        let revealed = revealedLetters.find((revealedLetter) => revealedLetter.letter === letter);
        let type = 'Hidden'
        if (revealed !== undefined) {
            type = revealed.type
        }
        return <WordleKey letter={letter} type={type} handleKeyPress={handleKeyPress} key={letter}/>
    }

    const outOfGuesses = () => {
        return (getGuessesLeft() <= 0);
    }

    const getGuessesLeft = () => {
        return numGuesses - lines.length;
    }
    
    //const fillerLine = lines
    let boardLines = [...lines.map(({id, text}) => {return {id: id, text: text, newLine: false}})]
    if (!(outOfGuesses())) boardLines = [...boardLines, {id:lines.length, text:newLine, newLine:true}]
    if (getGuessesLeft() > 0) boardLines = [...boardLines, ...Array(getGuessesLeft() - 1).fill(" ".repeat(wordLength)).map((value, index) => {
        return {id: lines.length + index + 1, text: value, newLine:false}
    })]

    return <div style={{position:'relative', 
                        display: 'flex', 
                        flexDirection:'column', 
                        justifyContent:'center'}}>
            <WordleLine lineWord={title} targetWord={title} title={true}/>
            <ToastNotifier toastMessages={toastMessages} setToastMessages={setToastMessages}></ToastNotifier>
            <WordleBoard lines={boardLines} targetWord={targetWord}/>
            <div className='Keyboard'>
            <div className='Keyboard-Line'>
                {keyboardLetters1.map(keyboardMap)}
            </div>
            <div className='Keyboard-Line'>
                {keyboardLetters2.map(keyboardMap)}
            </div>
            <div className='Keyboard-Line'>
                <WordleKey width='100' letter='&nbsp;ENTER&nbsp;' type='Hidden' handleKeyPress={handleKeyPress}/>
                {keyboardLetters3.map(keyboardMap)}
                <WordleKey width='100' letter='&nbsp;&nbsp;⌫&nbsp;&nbsp;&nbsp;' type='Hidden' handleKeyPress={()=>handleKeyPress({key:'BACKSPACE'})}/>
            </div>
            </div>
        </div>

}