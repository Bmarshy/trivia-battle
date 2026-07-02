import {useEffect, useState} from 'react'

function LobbyScreen({ roomCode, players, isHost, handleStartGame, category, setCategory,  difficulty, setDifficulty}){
    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function fetchCategories(){    
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            setCategories(data.trivia_categories)
        }
        fetchCategories()
    },[])

    return <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-4xl font-bold text-white text-center">Lobby</h1>
            <h1 className="text-2xl text-gray-400 text-center mb-2">Waiting for players . . .</h1>
            <p className="text-gray-400 text-sm text-center underline">Room Code</p>
            <p className="text-4xl font-bold text-blue-400 text-center tracking-widest mb-2">{roomCode}</p>
            <p className="text-gray-400 text-sm text-center mb-4">
                {category ? categories.find(c => c.id === Number(category))?.name : 'Any Category'} · {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </p>
            <h2 className="  text-gray-400  mb-2">Players: {players.length}/8</h2>
            <ul className="list-none p-0">
                {players.map((player) => (
                <li className="bg-gray-700 text-white px-4 py-2 rounded mb-2 list-none" key={player.id}>{player.name}</li>
                ))}
            </ul>
            { isHost && <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition mt-6" onClick={handleStartGame}>Start Game</button> }
        </div>
            {isHost && (
                <div className="flex gap-3 mt-4 justify-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 rounded font-bold transition bg-violet-600 text-white">
                        Categories
                    </button>
                    <button 
                        onClick={() => setDifficulty('easy')}
                        className={`px-4 py-2 rounded font-bold transition ${difficulty === 'easy' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        Easy
                    </button>
                    <button 
                        onClick={() => setDifficulty('medium')}
                        className={`px-4 py-2 rounded font-bold transition ${difficulty === 'medium' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        Medium
                    </button>
                    <button 
                        onClick={() => setDifficulty('hard')}
                        className={`px-4 py-2 rounded font-bold transition ${difficulty === 'hard' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                        Hard
                    </button>
                </div> 
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                    <h2 className="text-white font-bold text-xl mb-4">Choose a Category</h2>
                    <div className="grid grid-cols-4 gap-2">
                        {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => { setCategory(cat.id); setShowModal(false) }}
                            className={`p-2 rounded text-sm text-left transition h-16 flex items-center ${category === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}                        >
                            {cat.name}
                        </button>
                        ))}
                    </div>
                    <button onClick={() => { setCategory(''); setShowModal(false) }} className="mt-4 text-gray-400 hover:text-white text-sm">Clear selection</button>
                    <button onClick={() => setShowModal(false)} className="mt-4 ml-4 text-gray-400 hover:text-white text-sm">Close</button>
                    </div>
                </div>
            )}    
    </div>
}

export default LobbyScreen