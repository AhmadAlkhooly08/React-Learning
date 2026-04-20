import { useState } from "react";
export function Form({update}) {
  const [description,setDescription] = useState('');
  const [quantity,setNum] = useState(1);
  const [data,setData] = useState();

  function handleSubmit(e){
    e.preventDefault();
    if(!description) return;

    const newData = {id:Math.trunc(Date.now() + Math.random()),quantity,description,packed:false};
    update(newData)

    setDescription('')
    setNum(1)

  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={(e)=>setNum(+e.target.value)}>
        {Array.from({length:20},(_,i)=>i+1).map((number) => <option value={number} key={number}>{number}</option>)}
      </select>
      <input type="textarea" placeholder="item..." value={description} onChange={(e)=> setDescription(e.target.value)}></input>
      <button>ADD</button>
    </form>
  );
}
