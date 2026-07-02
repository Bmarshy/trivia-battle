
function ResultsScreen({ scores, players, correctAnswer}){
    const leaderboard = players.map(player => ({
        name: player.name,
        score: scores[player.id]
    }))
    leaderboard.sort((a,b) => b.score - a.score)

    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-4xl font-bold text-white text-center mb-2">Time's Up!</h1>
            <h2 className="text-2xl text-green-400 font-bold text-center tracking-widest underline">Correct Answer</h2>
            <h2 className="text-3xl text-green-400 text-center tracking-widest mb-4">{correctAnswer}</h2>
            <ul className="list-none p-0 mb-2">
                {leaderboard.map((entry) => (
                    <li key={entry.name} className="bg-gray-700 px-4 py-3 rounded mb-2 flex justify-between items-center">
                        <span className="text-white">{entry.name}</span>
                        <span className="text-white font-bold">{entry.score} pts</span>
                    </li>
                ))}
            </ul>
            <p className="text-2xl text-white text-center tracking-widest">Next Question in 5s . . .</p>
        </div>
    </div>
}

export default ResultsScreen