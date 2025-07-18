import React, { useState, useMemo } from 'react'
import {decode} from 'html-entities'
import clsx from 'clsx'

export default function QuestionItem({ question, correctAnswer, incorrectAnswers, selected, handleChange, isGameOver}) {
    const decodedQuestion = decode(question)

    const questionsAnswers = useMemo(() => {
        const allAnswers = [...incorrectAnswers,correctAnswer].map(answers => decode(answers))
        return allAnswers.sort(()=> Math.random() - 0.5)
    }, [question, correctAnswer, incorrectAnswers])


  return (
    <div className='question-block'>
        <h2 className='question-title'>{decodedQuestion}</h2>
        <div className="answers">
            {questionsAnswers.map((answer, idx) => {
                return (
                    <div key={idx}>
                        <input 
                            type='radio' 
                            name={decodedQuestion} 
                            id={answer} 
                            className={clsx("answer-radio-btn", 
                                {"selected-answer": !isGameOver && selected === answer},
                                {"not-selected-answer": isGameOver && selected !== answer && !selected === correctAnswer},
                                {"correct-answer": isGameOver && answer === correctAnswer},
                                {"incorrect-answer": isGameOver && answer !==correctAnswer && selected === answer},
                                {"faded-answer": isGameOver && selected !== answer && answer !== correctAnswer},
                                {"no-more-event": isGameOver}
                            )}
                            disabled={isGameOver}
                            value={answer}
                            checked={selected === answer}
                            onChange={()=>handleChange(answer)}
                        />
                        <label htmlFor={answer}>{answer}</label>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
