export default function WordleKey(props) {
    const {letter, type, handleKeyPress} = props
    return <div className={`Wordle-Key Wordle-Key-${type}`} style={{width: props.width || 40}} onClick={(e)=>{
        e.preventDefault()
        let key = (letter === '⌫' ? 'DELETE' : letter)
        handleKeyPress({key: key})
    }}><b>{letter}</b></div>
}