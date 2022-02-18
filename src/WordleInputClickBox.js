const WordleInputClickBox = ({state, toggleState, color}) => {
    const colors = {green:'var(--correct-background-color)', yellow:'var(--present-background-color)', gray:'var(--absent-background-color)'}
    const css = {backgroundColor: colors[color]}
    return <div className='WordleInputClickBox' onClick={toggleState} style={css}>
        <b>{state}</b>
    </div>
}

export { WordleInputClickBox }