const WordleTileButton = ({label, link, color}) => {
    const colors = {green:'var(--correct-background-color)', yellow:'var(--present-background-color)', gray:'var(--absent-background-color)'}
    const css = {backgroundColor: colors[color]}
    return <a className='WordleTileButton' href={link} style={css}>
        <b>{label}</b>
    </a>
}

export { WordleTileButton }