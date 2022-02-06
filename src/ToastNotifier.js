import ToastMessage from "./ToastMessage"

export default function ToastNotifier(props) {
    const {toastMessages, setToastMessages} = props
    return <div style={{position:'absolute', 
                        zIndex: '100',
                        top: `${(47.5 * (toastMessages.length)) + 60}px`,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex', 
                        flexDirection:'column-reverse', 
                        justifyContent:'center', 
                        alignSelf: 'flex-start',
                        rowGap: '15px'}}>
    {toastMessages.map(({message, id}) => {
    return <ToastMessage message={message} key={id} removeMe={()=> {
            let index = toastMessages.findIndex((message) => message.id === id)
            if (index > -1) {
                let newMessages = toastMessages.slice(0, index).concat(toastMessages.slice(index + 1))
                setToastMessages(newMessages)
            }
        }}/>
    }
    )}
    </div>
}