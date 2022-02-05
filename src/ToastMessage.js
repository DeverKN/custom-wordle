export default function ToastMessage(props) {
    const {message, removeMe} = props
    return <div className='Toast' onAnimationEnd={(e)=> {
        console.log('remove')
        removeMe()
    }}><b>{message}</b></div>
}