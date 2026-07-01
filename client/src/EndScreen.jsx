
function EndScreen({ scores, players, isHost, handlePlayAgain}){
    const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600']
    const leaderboard = players.map(player => ({
        name: player.name,
        score: scores[player.id]
    }))
    leaderboard.sort((a,b) => b.score - a.score)

    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-white text-center mb-2">Winner:</h1>
            <h2 className="text-4xl font-bold text-yellow-400 text-center tracking-widest">{leaderboard[0].name}</h2>
            <p className="text-3xl font-bold text-yellow-400 text-center tracking-widest mb-6">{leaderboard[0].score} pts</p>
            <ul className="list-none p-0">
                {leaderboard.map((entry, index) => (
                    <li key={entry.name} className="bg-gray-700 px-4 py-3 rounded mb-2 flex justify-between items-center">
                        <span className={`font-bold ${rankColors[index] || 'text-white'}`}>#{index + 1} {entry.name}</span>
                        <span className="text-white font-bold">{entry.score} pts</span>
                    </li>
                ))}
            </ul>
            { isHost && <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition mt-6" onClick={handlePlayAgain}>Play Again</button> }
        </div>
    </div>
}

export default EndScreen