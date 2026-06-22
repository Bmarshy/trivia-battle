import React from "react"
import {useEffect, useState} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
  const [playerName, setPlayerName] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const [players, setPlayers] = useState([])
  const [gamePhase, setGamePhase] = useState("home") 
 
  function handleCreateRoom(){
    if(!playerName) return
    console.log("Created Room")
    socket.emit('create-room', {playerName})
  }

  function handleJoinRoom(){
    if(!playerName || !roomCode) return
    console.log("Joined Room")
    socket.emit('join-room', {playerName, roomCode})
  }

  useEffect(() => {
    socket.on('connect', () =>{
      console.log('Connected to server:', socket.id)
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from server:', socket.id)
    })
    socket.on('room-created', (data) => {
      console.log('Room was created:', socket.id)
      setRoomCode(data.roomCode)
      setPlayers([{ id: socket.id, name: playerName}])
      setGamePhase("lobby")
    })
    socket.on('room-joined', (data) => {
      console.log('Room was joined:', socket.id)
      setRoomCode(data.roomCode)
      setPlayers(data.players)
      setGamePhase("lobby")
    })
    socket.on('player-joined', (data) => {
      console.log('Player has joined:', socket.id)
      setPlayers(data.players)  
    })
    socket.on('player-left', (data) => {
      console.log('Player has left:', socket.id)
      setPlayers(data.players)  
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('room-created')
      socket.off('room-joined')
      socket.off('player-joined')
      socket.off('player-left')
    }
  }, [playerName])


  if(gamePhase === "home"){
    return <div>
      <input type = "text" value = {playerName} onChange= {(e) => setPlayerName(e.target.value)} placeholder="Insert Player Name"></input>
      <input type = "text" value = {roomCode} onChange= {(e) => setRoomCode(e.target.value)} placeholder="Join Room Code"></input>
      <button onClick = {handleCreateRoom}>Create Room</button>
      <button onClick = {handleJoinRoom}>Join Room</button>  
    </div>
  }
  if(gamePhase === "lobby"){
    return <div>
      <p>Room Code: {roomCode}</p>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      <button>Start Game</button>
    </div>
  }
  return <div>Game Goes Here</div>
}

export default App
