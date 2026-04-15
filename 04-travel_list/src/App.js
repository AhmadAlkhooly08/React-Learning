import { useState } from "react";

export default function App() {
  const [updateData,setUpdate] = useState([]);
  function addData(item){
    setUpdate((items)=> [...items,item])
  }
  function handleDelete(key){
    setUpdate((item)=> item.filter(e=> e.id !== key))
  }
  function handlePacked(key){
    setUpdate((item)=> item.map(e=> e.id === key ? {...e,packed:!e.packed} : e))
  }
  return (
    <div className="app">
      <Logo />
      <Form update={addData}/>
      <PackingList item={updateData} handleDelete={handleDelete} onCheck={handlePacked}/>
      <Stats item={updateData}/>
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
function PackingList({item,handleDelete,onCheck}) {
  const [sort,setSort] = useState('input');
  let sortArray;

  if(sort === 'input') sortArray = item;
  if(sort === 'description') sortArray = item.slice().sort((a,b)=> a.description.localeCompare(b.description))
  if(sort === 'packed') sortArray = item.slice().sort((a,b)=> +a.packed - +b.packed)
  return(  
  <div className="list">
    <ul>
      {sortArray.map((e) => (
        <Item data={e} key={e.id} handleDelete={handleDelete} onCheck={onCheck}/>
      ))}
    </ul>

    <div className="actions">
      <select value={sort} onChange={(e)=> setSort(e.target.value)}>
        <option value={'input'}>Sort by input order</option>
        <option value={'description'}>Sort by description</option>
        <option value={'packed'}>Sort by packed status</option>
      </select>
      <button>clear list items</button>
    </div>
  </div>
)}
function Item({ data,handleDelete,onCheck}) {
  return (
    <li>
      <input type="checkbox" checked={data.packed} onChange={()=>onCheck(data.id)}></input>
      <span style={data.packed ? {textDecoration: 'line-through'} : {}}>
        {data.quantity} {data.description}
      </span>
      <button onClick={(e)=>handleDelete(data.id)}>❌</button>
    </li>
  );
}
function Stats({item}) {
    if(!item.length) return <p className="stats">
      <em>Start adding items to your list 🚀</em>
    </p>;
  const allItems = item.length;
  const packedItems = item.filter(e=> e.packed).length;
  const percentage = Math.round((packedItems / allItems) * 100)
  return (
    <footer className="stats">
      {percentage !== 100 ? <em>🧳 you have {allItems} items on your list, and you already packaged {packedItems}({percentage}%)</em> : <em>You got everything! Ready to go ✈️</em>}
    </footer>
  );
}
