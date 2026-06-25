import React from "react"
import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import HomeScreen from "./HomeScreen"
import LobbyScreen from "./LobbyScreen"
import GameScreen from "./GameScreen"

const socket = io('http://localhost:3001')

function App() {
  const [playerName, setPlayerName] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const [players, setPlayers] = useState([])
  const [gamePhase, setGamePhase] = useState("home")
  const [isHost, setIsHost] = useState(false)
 
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

  function handleStartGame(){
    console.log("Game Started")
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
      setIsHost(true)
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
    return <HomeScreen playerName={playerName} setPlayerName={setPlayerName} roomCode={roomCode} setRoomCode={setRoomCode} handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom}/>
  }
  if(gamePhase === "lobby"){
    return <LobbyScreen roomCode={roomCode} players={players} isHost={isHost} handleStartGame={handleStartGame}/>
  }
  return <GameScreen players={players} roomCode={roomCode}/>
}

export default App
