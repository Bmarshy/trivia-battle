

function LobbyScreen({ roomCode, players, isHost, handleStartGame}){

    return <div>
      <p>Room Code: {roomCode}</p>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      { isHost && <button onClick={handleStartGame}>Start Game</button> }
    </div>
}

export default LobbyScreen