import React from "react"
import {useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
  useEffect(() => {
    socket.on('connect', () =>{
      console.log('Connected to server:', socket.id)
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from server:', socket.id)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return <h1>Trivia Battle!</h1>
}

export default App
