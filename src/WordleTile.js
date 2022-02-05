import { useState } from "react"

export default function WordleTile(props) {
    const { text, type, delay } = props
    const [className, setClassName] = useState(`Wordle-Tile-Flip-${type}`)
    //Incredibly hacky solution
    //Basically because a state is used to store the class name sometimes the class name of the state
    //Gets out of sync with what it should. Someone please find a better solution. I no program good :(
    if (!((className === `Wordle-Tile-Flip-${type}`) || (className === `Wordle-Tile-${type}`))) {
        setClassName(`Wordle-Tile-Flip-${type}`)
    }
    return <div className = {className} 
                style = {{animationDelay:delay + 'ms'}}
                onAnimationEnd = {(e) => setClassName(`Wordle-Tile-${type}`)}><b>{text}</b></div>    
}