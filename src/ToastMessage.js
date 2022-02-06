export default function ToastMessage(props) {
    const {message, removeMe} = props
    return <div className='Toast' onAnimationEnd={(e)=> {
        removeMe()
    }}><b>{message}</b></div>
}