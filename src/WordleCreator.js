import { useState } from "react"
import { AlignedVertical } from "./AlignedHorizontal"
import { WordleTileSlider } from "./WordleTileSlider"
import { WordleTileInputBox } from "./WordleTileInputBox"
import { randomArrayElement } from "./Utilities"
import { WordleInputClickBox } from "./WordleInputClickBox"
import { WordleTileButton } from "./WordleTileButton"

const WordleCreator = () => {
    const [wordLength, setWordLength] = useState(5)
    const [numGuesses, setNumGuesses] = useState(6)
    const [title, setTitle] = useState(randomArrayElement(require(`./words/RDLE-Words.json`)).toUpperCase())
    const [customWord, setCustomWord] = useState("")
    const [customWordToggle, setCustomWordToggle] = useState(false);

    const createWordle = (title, numGuesses, wordLength, customWord) =>{ 
      let path = `?title=${title.split('_')[0]}&num_guesses=${numGuesses}&word_bank_length=${wordLength}&word_bank_type=default`; 
      if (customWord !== "_") {
          path += `&word=${customWord}`
      }
      /*window.location.href(*/return `https://deverkn.github.io/custom-wordle${path}`//)
    }

    const translateCustomWord = (toggled) => {
        return (toggled ? 'Custom Word' : 'Random Word')
    }

    const valid = (!customWordToggle || (customWord.split('_')[0].length >= parseInt(wordLength)))
    return <div className='RulesPopUp'>
        <AlignedVertical>
            <label for='name'><b>Title:</b></label>
            <WordleTileInputBox id='name' text={title} setText={setTitle} maxLength={title.split('_')[0].length + 2}></WordleTileInputBox>
        </AlignedVertical>
        <AlignedVertical>
            <label for='wordLength'><b>Word Length:</b></label>
            <WordleTileSlider id='wordLength' value={wordLength} setValue={setWordLength} min="1" max="20" magicRatio={136} magicOffset={5}/>
        </AlignedVertical>
        <AlignedVertical>
            <label for='numGuesses'><b>Max Guesses:</b></label>
            <WordleTileSlider id='numGuesses' value={numGuesses} setValue={setNumGuesses} min="1" max="25" magicRatio={126} magicOffset={0}/>
        </AlignedVertical>
        <AlignedVertical>
            <WordleInputClickBox id='customWord' state={translateCustomWord(customWordToggle)} color={(customWordToggle ? 'green' : 'yellow')} toggleState={() => setCustomWordToggle(!customWordToggle)}/>
        </AlignedVertical>
        {customWordToggle && <div>
            <WordleTileInputBox id='customWord' text={customWord} setText={setCustomWord} maxLength={wordLength}></WordleTileInputBox>
        </div>}
        <WordleTileButton label='Create' color={(valid ? 'green' : 'yellow')} link={createWordle(title, numGuesses, wordLength, (customWordToggle ? customWord.slice(0, wordLength)  : "_"))}></WordleTileButton>
    </div>
}

export {WordleCreator}