import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true },
];

export default function App() {
  const [updateData,setUpdate] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form update={setUpdate}/>
      <PackingList item={updateData}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({update}) {
  const [description,setDescription] = useState('');
  const [quantity,setNum] = useState(1);
  const [data,setData] = useState();
  function handleSubmit(e){
    e.preventDefault();
    if(!description) return;
    initialItems.push({id:initialItems.length +1,quantity,description,packed:false});
    console.log(initialItems)
    update(initialItems)

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
function PackingList({item}) {
  return(  
  <div className="list">
    <ul>
      {item.map((e) => (
        <Item data={e} key={e.id}/>
      ))}
    </ul>
  </div>
)}
function Item({ data }) {
  const [check,setCheck] = useState(data.packed);
  const checkTrue = ()=> setCheck(data.packed = !check);
  return (
    <li>
      <input type="checkbox" checked={check} onChange={checkTrue}></input>
      <span style={data.packed ? {textDecoration: 'line-through'} : {}}>
        {data.quantity} {data.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>🧳 you have x items on your list, and you already packaged x(x%)</em>
    </footer>
  );
}
