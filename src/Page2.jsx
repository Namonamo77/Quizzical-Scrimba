import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Questions from './components/Questions'

export default function Page2() {
    const URL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"

    const [rawData, setRawData] = useState([])

    function fetchQuestions(){
      fetch(URL)
        .then(res => {
          if (!res.ok){
            throw new Error("Network error:" + res.statusText)
          }
          return res.json()})
        .then(data => {
            console.log("questions", data.results)
            setRawData(data.results)
        })
        .catch(err => console.error("Fetch error:", err))
    }


    useEffect(()=>{
        fetchQuestions()
    }, [])
  return (
    <div>
        <Questions data={rawData} playAgain={fetchQuestions} />
        
    </div>
  )
}
