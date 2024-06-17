import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => { 
      console.log('connected')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Received message : ', message.data)
      setLatestMessage(message.data)
    }

    return () => {
      socket.close()
    }
  }, [])

  if(!socket) {
    return <div>
      Connected to socket server...
    </div>
  }

  return (
    <>
    <input onChange={(e) => {
      setMessage(e.target.value)
    }}/>
    <button onClick={() => {
      socket.send(message);
    }}>Send</button>
      {latestMessage}
    </>
  )
}

export default App
