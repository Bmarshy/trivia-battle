

function HomeScreen({ playerName, setPlayerName, roomCode, setRoomCode, handleCreateRoom, handleJoinRoom}){

    return <div>
      <input type = "text" value = {playerName} onChange= {(e) => setPlayerName(e.target.value)} placeholder="Insert Player Name"></input>
      <input type = "text" value = {roomCode} onChange= {(e) => setRoomCode(e.target.value)} placeholder="Join Room Code"></input>
      <button onClick = {handleCreateRoom}>Create Room</button>
      <button onClick = {handleJoinRoom}>Join Room</button>  
    </div>
}

export default HomeScreen