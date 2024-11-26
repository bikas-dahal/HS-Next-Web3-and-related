
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const [messages, setMessages] = useState(['hi'])
  const inputRef= useRef()

  function sendMessage () {
    if (!socket) {
      return
    }
//@ts-ignore

    const message = inputRef.current.value
    console.log(message);
    
//@ts-ignore
    socket.send(JSON.stringify({
      type: 'message',
      payload: {
        message
      }
    }))
  } 

  function joinRoom () {
    if (!socket) {
      return
    }
//@ts-ignore

    // const message = inputRef.current.value
    // console.log(message);
    
//@ts-ignore
    socket.send(JSON.stringify({
      type: 'message',
      payload: {
        room: '12'
      }
    }))
  } 

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    setSocket(ws)

    ws.onmessage = (e) => {
      setMessages(m => [...m, e.data])
      // alert(e.data)
    }

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'join',
        payload: {
          room: '12'
        }
      })
      )
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <div className='bg-slate-300 flex flex-col justify-between min-h-screen'>
        <div className='flex flex-col items-center justify-center pt-10'>
          Messages: 
            {messages.map((message, index) => (
              <div key={index} className='p-2 bg-slate-400 rounded-md m-2'>
                {message}
              </div>
            ))  
            }
        </div>
        <div className='flex items-center justify-center min-h-screen gap-4'>
          <input className='rounded-md p-2 ' ref={inputRef} type="text" placeholder='Message...' />
          <button className='border bg-pink-700 p-2 hover:bg-blue-950 hover:text-white rounded-md' onClick={sendMessage}>
            Send
          </button>
          <button className='border bg-pink-700 p-2 hover:bg-blue-950 hover:text-white rounded-md' onClick={joinRoom}>
            Join
          </button>

        </div>
      </div>
    </>
  )
}

export default App
