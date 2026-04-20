import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App(){
  return <div>
    <Steps/>
  </div> 
}
function Steps(){
  const [step, stepNum] = useState(1);
  const [isOpen, setOpen] = useState(true);
  const addOne = () => {
    if (step < 3) stepNum((s) => s + 1);
  };
  const extractOne = () => {
    if (step > 1) stepNum((s) => s - 1);
  };
  const closeComponent = () => setOpen((is=> !is));
  return(
    <div>
      <button className="close" onClick={closeComponent}>
        &times;
      </button>

      {isOpen && (
        <div
          className="steps"
          style={{ display: isOpen === true ? "" : "none" }}
        >
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <Step step={step}>{messages[step - 1]}</Step>
          <div className="buttons">
            <Btn Bg= "#7950f2" textColor="#fff" clickHandel={extractOne}><span>👈</span> Previous</Btn>
            <Btn Bg= "#7950f2" textColor="#fff" clickHandel={addOne}>Next <span>👉</span></Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({step,children}){
  return   <div className="message">
            <h3>Step {step}</h3>
             <p>{children}</p>
          </div>

}
function Btn({Bg,textColor,clickHandel,children}){
  return  <button style={{ backgroundColor: Bg, color: textColor }} onClick={clickHandel} >
              {children}
          </button>

}