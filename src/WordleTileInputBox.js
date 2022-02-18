import { useEffect, useState } from "react"

const WordleTileInputBox = ({text, setText, maxLength}) => {

    const wrappedSetText = (text) => {
        setText(text.trim())
    }

    const [isFocused, setIsFocused] = useState(false)

    const [caretLoc, setCaretLoc] = useState(0)

    text = text + "_".repeat(Math.max(0, maxLength - text.length));

    text = text.slice(0, maxLength)

    const moveCaret = (newLoc, newText = text) => {
        const leftFixedCaret = Math.max(0, newLoc);
        const rightFixedCaret = Math.min(newText.length - 1, leftFixedCaret)
        const lengthFixedCaret = Math.min(rightFixedCaret, newText.split("_")[0].length)
        setCaretLoc(lengthFixedCaret)
    }

    const handleDivClick = (e) => {
        setIsFocused(true)
        e.stopPropagation();
    }

    const handleOutsideClick = () => setIsFocused(false)

    const keyDownHandler = (e) => {
        if (!isFocused) return

        const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM '.split("")
        if (e.key === 'ArrowLeft') {
            //Left
            moveCaret(caretLoc - 1)
            e.preventDefault()
        } else if (e.key === 'ArrowRight') {
            //Right
            moveCaret(caretLoc + 1)
            e.preventDefault()
        } else if (e.key === 'Backspace') {
            let sliceLoc = caretLoc;
            if (text[caretLoc] === '_') {
                sliceLoc--;
            }
            sliceLoc = Math.max(0, sliceLoc)
            wrappedSetText(text.slice(0, sliceLoc) + text.slice(sliceLoc + 1))
            moveCaret(sliceLoc)
            e.preventDefault()
        } else if (letters.includes(e.key.toUpperCase())) {
            const blank = text[caretLoc] === "_";
            const newText = text.slice(0, caretLoc) + e.key.toUpperCase() + text.slice(caretLoc + 1);
            wrappedSetText(newText)
            console.log('blank')
            if (blank) moveCaret(caretLoc + 1, newText)
            e.preventDefault()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (keyDownHandler), {passive : false})
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('keydown', keyDownHandler)
        }
    })

    return <div className='WordleTileInputLine' onClick={handleDivClick}>
        {text.split("").map((letter, index) => {
            const nextSpot = (index <= text.split("_")[0].length)
            const color = (letter === "_" ? (nextSpot ? 'yellow' : 'gray') : 'green')
            const onClick = (index <= text.split("_")[0].length ? ()=>moveCaret(index) : ()=>{})
            return <WordleInputTile 
                    char={letter === '_' ? ' ' : letter} 
                    index={index} 
                    key={letter + index} 
                    focused={(caretLoc === index) && isFocused} 
                    color={color}
                    onClick={onClick}></WordleInputTile>
        })}
    </div>
}

const WordleInputTile = ({char, onClick, focused = false, color = 'green'}) => {
    const borderSize = (focused ? 2 : 0);
    const colors = {green:'var(--correct-background-color)', yellow:'var(--present-background-color)', gray:'var(--absent-background-color)'}
    const css = {
        borderColor: (focused ? 'var(--wordle-white)' : ''),
        borderWidth: `${borderSize}px`,
        width: `${30 - (borderSize * 2)}px`,
        height: `${30 - (borderSize * 2)}px`,
        backgroundColor: colors[color]
    }
    return <div className='WordleInputTile' onClick={onClick} style={css}>
        <b>{char}</b>
    </div>
}

export {WordleTileInputBox}