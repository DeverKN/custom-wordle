import { useState } from "react"

export default function WordleTile(props) {
    const { text, type, index, length } = props
    const [className, setClassName] = useState(`Wordle-Tile-Flip-${type}`)
    //Incredibly hacky solution
    //Basically because a state is used to store the class name sometimes the class name of the state
    //Gets out of sync with what it should. Someone please find a better solution. I no program good :(
    if (!((className === `Wordle-Tile-Flip-${type}`) || (className === `Wordle-Tile-${type}`) || (className === `Wordle-Tile-Flip-Intermediate-${type}`))) {
        setClassName(`Wordle-Tile-Flip-${type}`)
    }

    let animationEnd = (e) => setClassName(`Wordle-Tile-${type}`);
    if (type === 'Title') {
        let titleAnimationEnd = (e) => {
            //console.log(className)
            if (className === `Wordle-Tile-${type}`) {
                setClassName(`Wordle-Tile-Flip-Intermediate-${type}`);
            } else {
                setClassName(`Wordle-Tile-${type}`);
            }
            /*if ((className === `Wordle-Tile-Flip-${type}`) || (`Wordle-Tile-Flip-Intermediate-${type}`)) {
                setClassName(`Wordle-Tile-${type}`);
            } else {
                console.log('other')
                setClassName(`Wordle-Tile-Flip-Intermediate-${type}`);
            }*/
        }
        animationEnd = titleAnimationEnd;
    }
    return <div className = {className} 
                style = {{'--animation-index': index, '--line-length': length}}
                onAnimationEnd = {animationEnd}><b>{text}</b></div>    
}