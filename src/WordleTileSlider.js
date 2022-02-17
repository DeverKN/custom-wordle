const WordleTileSlider = ({value, setValue, id, min, max, ...otherProps}) => {

    const getThumbLocation = (value) => {
        return {y:6.5, x: ((parseInt(value) / max) * 136) - 5}
    }

    const thumbLoc = getThumbLocation(value)
    const color = ((value <= (max - min) / 2) ? 'var(--correct-background-color)' : 'var(--present-background-color)');
    return <div>
            <WordleTileThumb color={color} display={value} x={thumbLoc.x} y={thumbLoc.y}></WordleTileThumb>
            <input className='WordleTileSlider' id={id} value={value} type='range' spellCheck='false' min={min} max={max} onChange={(e)=> {
                console.log(e.target.value)
                setValue(e.target.value)
            }} {...otherProps}/>
        </div>
}

const WordleTileThumb = ({color, display, x, y}) => {
    const css = {
        transform: `translateX(${x}px) translateY(${y}px)`,
        pointerEvents: 'none',
        backgroundColor: color/*(color === 'green' ? 'var(--correct-background-color)' : 'var(--present-background-color)')*/
    }
    console.log(css)
    return <div className='WordleTileThumb' style={css}><b>{display}</b></div>
}

export {WordleTileSlider}