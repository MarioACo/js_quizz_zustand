import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
    question: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void
    reset: () => void
}



export const useQuestionsStore = create<State>()(persist((set, get) => {
    return{
        question: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()
            const question = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({question})
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { question } = get()
            //usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(question)
            //encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q => q.id === questionId)
            //obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex]
            //averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex 
            if(isCorrectUserAnswer)confetti()
            // cambiar esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            //actualizamos el estado
            set({question: newQuestions})


        },

        goNextQuestion: () => {
            const { currentQuestion, question} = get()

            const nextQuestion = currentQuestion + 1

            if(nextQuestion < question.length)set({currentQuestion: nextQuestion})
        },

        goPreviousQuestion: () => {
            const {currentQuestion} = get()
            const previousQuestion = currentQuestion - 1

            if(previousQuestion >= 0) set({currentQuestion: previousQuestion})
        },

        reset: () => {
            set({currentQuestion: 0, question: []})
        }
    }
}, {
    name: 'questions'
}))