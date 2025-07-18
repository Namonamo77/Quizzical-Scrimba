import React, { useState } from 'react'

export default function Page1({startGame}) {
  return (
    <div className='intro'>
        <h1>Quizzical</h1>
        <p className='description'>Test your knowledge with this fun quiz! Click the button to start.</p>
        <button onClick={startGame} className="start-btn">Start quiz</button>
    
    </div>
  )
}
