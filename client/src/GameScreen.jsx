import {useMemo} from 'react'
import { decodeHTML } from './utils'

function GameScreen({ players, roomCode, question, questionIndex}){
    

    const shuffledAnswers = useMemo(() => {
        if(!question) return []
        const answers = [question.correct_answer, ...question.incorrect_answers]
        answers.sort(() => Math.random() - 0.5)

        return answers
    }, [question])
    
    if(!question) return <div>Loading . . .</div>

    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-400 text-center mb-2">Game In Progress {roomCode}</h1>
                <p className="text-2xl text-white text-center mb-2">{decodeHTML(question.question)}</p>
                <div className="flex flex-col gap-3 mt-4">
                    {shuffledAnswers.map((answer) => (
                    <button key={answer} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition text-left">{decodeHTML(answer)}</button>
                    ))}
                </div>
            </div>
        </div>
        
}

export default GameScreen