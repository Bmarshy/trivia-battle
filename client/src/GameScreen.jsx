import {useMemo, useEffect, useState} from 'react'
import { decodeHTML } from './utils'

function GameScreen({ players, roomCode, question, questionIndex, handleAnswer}){
    const [hasAnswered, setHasAnswered] = useState(false)

    const shuffledAnswers = useMemo(() => {
        if(!question) return []
        const answers = [question.correct_answer, ...question.incorrect_answers]
        answers.sort(() => Math.random() - 0.5)

        return answers
    }, [question])
    
    useEffect(() => {
        setHasAnswered(false)
    }, [question])

    if(!question) return <div>Loading . . .</div>

    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-400 text-center mb-2">Game In Progress {roomCode}</h1>
                <p className="text-2xl text-white text-center mb-2">{decodeHTML(question.question)}</p>
                <div className="flex flex-col gap-3 mt-4">
                    {shuffledAnswers.map((answer) => (
                    <button 
                        onClick={() => {
                            setHasAnswered(true)
                            handleAnswer(answer)
                        }} 
                        key={answer}
                        disabled={hasAnswered}
                        className={`bg-gray-700 text-white px-4 py-3 rounded-lg transition text-left ${hasAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}>
                            {decodeHTML(answer)}
                    </button>
                    ))}
                </div>
            </div>
        </div>
        
}

export default GameScreen