import React, { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import QuestionItem from './QuestionItem'
import { decode } from 'html-entities'

export default function Questions({data: initialData, playAgain}) {
    
    const [data, setData] = useState(initialData || [])
    const [selectedAnswer, setSelectedAnswer] = useState([])
    const [answersCount, setAnswersCount]= useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [checkIsComplete, setCheckIsComplete] = useState(true)

    useEffect(()=>{
      setData(initialData || [])
      setSelectedAnswer([])
    }, [initialData, data])

    function isComplete(){
      if (answersCount !== 5){
        setCheckIsComplete(false)
      }
    }

    function handleChange(questionIdx, answer){
      
      console.log("clicked")
      setSelectedAnswer(prev => {
        const updated = [...prev]
        console.log(updated)
        updated[questionIdx] = answer
        return updated
      })
      console.log("Updated selected answers", selectedAnswer)
      
    }

    function handleCheckedAnswers(){
      const correctAnswers = data.map(answer => answer.correct_answer)
      const isCorrect = selectedAnswer.map((answer, idx) => decode(correctAnswers[idx]) === decode(answer))
      console.log("correct answers", isCorrect)
      setAnswersCount(isCorrect.filter(answer => answer).length)
      setGameOver(true)
      
    }

    function restartGame(){
      setSelectedAnswer([])
      setAnswersCount(0)
      setGameOver(false)
      playAgain()
    }
    
    // useEffect(() => {
    //   console.log("correct answers count", answersCount)
    //   console.log("correct answers", data.map(answer => answer.correct_answer))

    // }, [answersCount])


    // useEffect(()=>{
    //   setAnswersCount(prev => prev +1)
    //   console.log("Answers count", answersCount)
    // }, [answersCount])

    let questionsChildren = data.map((item, idx) => {
      return (
        <QuestionItem 
          key={idx} 
          question = {item.question}
          correctAnswer = {item.correct_answer}
          incorrectAnswers = {item.incorrect_answers}
          selected = {selectedAnswer[idx]}
          handleChange={answer => handleChange(idx, answer)}
          isGameOver={gameOver}
        />

      )
    })
  return (
    <article className='questions-container'>

        {questionsChildren}
        {gameOver && <p aria-live="polite" className="score">You scored {answersCount}/5 correct answers</p>}
        {!gameOver && !checkIsComplete && answersCount !== 5 && <p aria-live="polite" className='score'>You have to answer all the questions</p>}
        <button onClick={gameOver ? restartGame : handleCheckedAnswers} className="check-btn">{gameOver ? "Play again" : "Check answers"}</button>
    </article>
  )
}
