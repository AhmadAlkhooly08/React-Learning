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
  const [answers,setAnswers] = useState([]);
  const [hasSubmitted,setSubmit] = useState(false);
  function handleAnswer(answer){
    const check = answers.find(e=> e.QuestionNumber === questionNum);
    const val= answer === allData[questionNum].correctAnswer ? true : false;

    setAnswers((e)=>  check ? e.map(a=> a === check ? {...a,Answer:answer, value: val} : a) : [...e,{QuestionNumber:questionNum,Answer:answer, value: val}].sort((a,b)=> a.QuestionNumber - b.QuestionNumber))
  }
  function handleClickNum(e){
    const maxNum = answers.length > 0 ? answers.reduce((prev,cur)=> prev.QuestionNumber > cur.QuestionNumber ? prev.QuestionNumber : cur.QuestionNumber) + 1 : questionNum;
    setQuestionNum((Num)=>e < maxNum ? e : Num)
  }
  function handleSubmit(){
    setSubmit(true)
  }
  return <div className="app">
    <Questions questionNum={questionNum} handleQuestionNum={setQuestionNum} onAnswer={handleAnswer} answersData={answers} checkSubmit={hasSubmitted} onSubmit={handleSubmit}/>
    <Numbers Num={questionNum+1} answersData={answers} onClickNum={handleClickNum} checkSubmit={hasSubmitted}/>
  </div>
}

function Questions({questionNum,handleQuestionNum,onAnswer,answersData,checkSubmit,onSubmit}){
  return <div className="question-section">
    <div className="question-box">
      <h3>Question {questionNum + 1}</h3>
      <p>{allData[questionNum].question}</p>
    </div>
    {allData[questionNum].allAnswers.map(e=> <dev className={`choice-box ${answersData.find(a=> a.Answer === e) ? 'selected' : ''}`} onClick={()=>onAnswer(e)}><p>{e}</p></dev>)}
    <div className="btns">
      {questionNum !== 0 && <button onClick={()=> handleQuestionNum(e=> e > 0 ? e -1 : e)}>Prev</button>}
      <button onClick={()=> questionNum < 19 ? handleQuestionNum(e=> e < 19 ? e +1 : e) : onSubmit()}>{questionNum !== 19 ? 'Next' : 'Submit'}</button>
    </div> 
    <div className="explanation-box">
      <h3>Explanation</h3>
      <p>{allData[questionNum].question}</p>
    </div>
  </div>
} 

function Numbers({Num,answersData,onClickNum,checkSubmit}){
  const findAnswerd = answersData.includes(answersData.find(a=> a.QuestionNumber === e))
  return<div className="number-section">
    <h3>{Num}/20</h3>
    <div className="numbers">
      {Array.from({length:20},(__dirname,i)=>i).map(e=> <div onClick={()=> onClickNum(e)}><li className={`${findAnswerd && e +1 !== Num ? 'finished' : ''} ${e +1 === Num ? 'active' : ''} ${checkSubmit ? answersData[e]:''}`} value={answersData.forEach(a=)}>{e + 1}</li></div>)}
    </div>
  </div>
}