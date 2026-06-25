

function HomeScreen({ playerName, setPlayerName, roomCode, setRoomCode, handleCreateRoom, handleJoinRoom}){

    return  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Brain Twister Trivia Battle ⚡</h1>
            <input type = "text" value = {playerName} onChange= {(e) => setPlayerName(e.target.value)} placeholder="Insert Player Name" className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 mb-3"></input>
            <input type = "text" value = {roomCode} onChange= {(e) => setRoomCode(e.target.value)} placeholder="Join Room Code" className="w-full bg-gray-700 text-white border border-gray-600 rounded p-2 mb-3"></input>
            <div className="flex gap-3">
                <button onClick = {handleCreateRoom} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition mb-3">Create Room</button>
                <button onClick = {handleJoinRoom} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition mb-3">Join Room</button>
            </div>  
        </div>
    </div>
}

export default HomeScreen