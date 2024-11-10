import {useState, useEffect, useRef} from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  // const [count, setCount] = useState(0)
  //
  // const increaseCount = () => {
  //   setCount((prevCount) => prevCount + 1)
  // }
  //
  //
  // useEffect(() => {
  //   const interval = setInterval(increaseCount, 1000)
  //
  //   return () => clearInterval(interval)
  // }, []);


  return (
    <>
        <Navbar />
      <Router>
          <Routes>
              <Route path="/" element={App} />
              <Route path={'/check'} element={<Check />} />
              <Route path={'/timer'} element={<Timer />} />
          </Routes>
      </Router>
    </>
  )
}

const Timer = () => {
    const [currentCount, setCurrentCount] = useState(0)
    const timerRef = useRef()

    const onStart = () => {
        let value = setInterval( () => setCurrentCount(currentCount => currentCount + 1 ), 1000)
        timerRef.current = value
    }

    const onStop = () => {
        clearInterval(timerRef.current)
    }


    return (
        <div className={'mx-20'}>
            <span className={'bg-pink-200 text-3xl p-2 ml-16 m-2 rounded-xl'}>{currentCount} </span>
            <br/>
            <div className={'flex gap-x-5 m-3 text-xl '}>
                <button className={'border p-2 bg-blue-400 rounded-md'} onClick={onStart}>Start</button>
                <button className={'border px-2 bg-red-400 rounded-md'} onClick={onStop}>Stop</button>

            </div>
        </div>

    )
}

const Check = () => {

    const inputRef = useRef()

    const focusOnInput = () => {
        inputRef.current.focus()
    }

    return <>
        <div className={'flex gap-2 p-3'}>
            <input ref={inputRef} />
            <input/>
            <button onClick={focusOnInput} className={'bg-blue-400 rounded-md p-2'}>Check</button>
        </div>
    </>
}

export default App
