

function LobbyScreen({ roomCode, players, isHost, handleStartGame}){

    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-white text-center mb-2">Waiting for players . . .</h1>
            <p className="text-gray-400 text-sm text-center mb-1 underline">Room Code</p>
            <p className="text-4xl font-bold text-blue-400 text-center tracking-widest mb-6">{roomCode}</p>
            <h2 className="  text-gray-400  mb-2">Players: {players.length}/8</h2>
            <ul className="list-none p-0">
                {players.map((player) => (
                <li className="bg-gray-700 text-white px-4 py-2 rounded mb-2 list-none" key={player.id}>{player.name}</li>
                ))}
            </ul>
            { isHost && <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition mt-6" onClick={handleStartGame}>Start Game</button> }
        </div>
      
    </div>
}

export default LobbyScreen