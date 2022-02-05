import WordleLine from "./WordleLine";

export default function WordleBoard(props) {
    const {lines, targetWord} = props
    const css = {display: 'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                width:'1000px',
                gap:'6px',
                userSelect: 'none'}
    return <div style={css}>
            {lines.map(({id, text, newLine}) => {return <WordleLine key={id} lineWord={text} targetWord={targetWord} newLine={newLine}/>})}
    </div>;
}