import { useState } from "react"
import { AlignedVertical } from "./AlignedHorizontal"
import { WordleTileSlider } from "./WordleTileSlider"
import { WordleTileInputBox } from "./WordleTileInputBox"
import { randomArrayElement } from "./Utilities"

const WordleCreator = () => {
    const [wordLength, setWordLength] = useState(0)
    const [numGuesses, setNumGuesses] = useState(0)
    const [text, setText] = useState(randomArrayElement(require(`./words/RDLE-Words.json`)).toUpperCase())
    return <div className='RulesPopUp'>
        <AlignedVertical>
            <label for='name'><b>Name:</b></label>
            <input className='RuleInputBox' id='name' type='text' spellCheck='false' autocomplete="off"/>
        </AlignedVertical>
        <AlignedVertical>
            <label for='name'><b>Name:</b></label>
            <WordleTileInputBox id='name' text={text} setText={setText} maxLength={10}></WordleTileInputBox>
        </AlignedVertical>
        <AlignedVertical>
            <label for='wordLength'><b>Word Length:</b></label>
            <WordleTileSlider id='wordLength' value={wordLength} setValue={setWordLength} min="1" max="20"/>
        </AlignedVertical>
        <AlignedVertical>
            <label for='numGuesses'><b>Max Guesses:</b></label>
            <WordleTileSlider id='numGuesses' value={numGuesses} setValue={setNumGuesses} min="1" max="100"/>
        </AlignedVertical>
    </div>
}

export {WordleCreator}