import WordleLine from "./WordleLine";

export default function WordleBoard(props) {
    const {lines, targetWord} = props
    const css = {display: 'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                gap:'6px',
                userSelect: 'none',
                marginBottom: '6px'}
    return <div style={css}>
            {lines.map(({id, text, newLine}) => {return <WordleLine key={id} lineWord={text} targetWord={targetWord} newLine={newLine}/>})}
    </div>;
}