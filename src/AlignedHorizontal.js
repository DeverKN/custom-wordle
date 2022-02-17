const AlignedVertical = ({children}) => {
    const css = {
        display: 'flex',
        flexDirection: 'row',
    }
    return <div style={css}>
            {children}
        </div>
}

export {AlignedVertical}