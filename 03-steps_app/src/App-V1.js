import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App(){
  return <div>
    <Steps/>
    <Steps/>
  </div> 
}
function Steps() {
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
          <p className="message">
            Step{step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={extractOne}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={addOne}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
