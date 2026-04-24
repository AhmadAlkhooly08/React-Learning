import { useState } from "react";

async function data(){
  try{
    const rest = await fetch('https://opentdb.com/api.php?amount=20&type=multiple');

    const data = await rest.json();
    if(!data.results) return; 
    const editedData = data.results.map(e=>{
      return{question:e.question,correctAnswer:e.correct_answer,incorrectanswers:e.incorrect_answers, allAnswers: [e.correct_answer,...e.incorrect_answers].sort()}
    })
    console.log(editedData)
    return editedData;
  }catch(err){
    console.log(err)
  }
}
let allData = await data().then(resault=> resault);

console.log(allData)
export default function App(){
  const [questionNum,setQuestionNum] = useState(0)
  return <div className="app">
    <Questions questionNum={questionNum} handleQuestionNum={setQuestionNum}/>
  </div>
}

function Questions({questionNum,handleQuestionNum}){
  return <div className="question-section">
    <div className="question-box">
      <h3>Question {questionNum + 1}</h3>
      <p>{allData[questionNum].question}</p>
    </div>
    {allData[questionNum].allAnswers.map(e=> <dev className="choice-box"><p>{e}</p></dev>)}
    <div className="btns">
      <button onClick={()=> handleQuestionNum(e=> e > 0 ? e -1 : e)}>Prev</button>
      <button onClick={()=> handleQuestionNum(e=> e < 19 ? e +1 : e)}>Next</button>
    </div> 
    <div className="explanation-box">
      <h3>Explanation</h3>
      <p>{allData[questionNum].question}</p>
    </div>
  </div>
} 