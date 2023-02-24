import {ReactMediaRecorder} from 'react-media-recorder'
import './audio.css'

const Audio = () => {
  return (
    <ReactMediaRecorder
      audio

      render = {({status,startRecording,stopRecording,mediaBlobUrl}) => (
        <div className='audio'>
            
            <button onClick={startRecording}>Start</button>
            <button onClick={stopRecording}>Stop</button>
            <audio src={mediaBlobUrl} autoPlay controls></audio>
            <p className='recordstat'>{status}</p>
        </div>
      )}
    />
  )
}

export default Audio