import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [newFriend, setNewFriend] = useState([...initialFriends]);
  const [selected,setSelect] = useState(false)
  function onData(data) {
    setNewFriend((friends) => [...friends, data]);
  }

  function handleSelected(freind,hideForm){
    setSelect((cur)=> cur?.id === freind.id ? null : freind)
    hideForm(false)
  }

  return (
    <div className="app">
      <List Friends={newFriend} findSelected={handleSelected} selected={selected} setNewFriend={onData}/>
      {selected && <SplitBill Friend={selected} reNew={setSelect} editFriend={setNewFriend}/>}
    </div>
  );
}

function List({Friends,findSelected,setNewFriend,selected}) {
  const [addFr, setAdd] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {Friends.map((e) => (
          <ListItem data={e} key={e.id} findSelected={findSelected} selected={selected} addForm={setAdd}/>
        ))}
      </ul>
      {addFr && <Form setNewFriend={setNewFriend} hide={setAdd}/>}
      <button className="button" onClick={() => setAdd((e) => !e)}>
        {addFr ? "close" : "add friend"}
      </button>
    </div>
  );
}

function ListItem({ data,findSelected ,selected,addForm}) {
  const isSelected = selected?.id === data.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      {data.balance < 0 && <p className="red">{`you owe ${data.name} ${Math.abs(data.balance)}£`}</p>}
      {data.balance > 0 && <p className="green">{`${data.name} owse you ${data.balance}£`}</p>}
      {data.balance === 0 && <p>{`You and ${data.name} are even`}</p>}
      <button className="button" onClick={()=>findSelected(data,addForm)}>{ isSelected ? 'close' : 'select'}</button>    
    </li>
  );
}
function Form({  setNewFriend,hide }) {
  const [newData, setData] = useState();
  const [newImage, setImage] = useState('https://i.pravatar.cc/48');
  function handleSubmit(e){
    e.preventDefault();
    if(!newData || !newImage) return;
    const id = crypto.randomUUID();
    const data = { name: newData, image: `${newImage}?=${id}`, id: id, balance: 0 };
    setNewFriend(data)
    hide(false)
  }
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label>👬 Friend name</label>
      <input
        type="text"
        value={newData}
        onChange={(e) => setData(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input type="text" value={newImage}
        onChange={(e) => setImage(e.target.value)}/>
      <Btn>Add</Btn>
    </form>
  );
}
function SplitBill({Friend,reNew,editFriend}) {
  const [bill,setBill] = useState('');
  const [yourExpense,setYourExpense] = useState('');
  const [option,setOption]=useState('you');
  const freindExpense = bill - yourExpense;
  function onSubmit(e){
    e.preventDefault();
    Friend.balance = option === 'you' ? freindExpense + Friend.balance : (freindExpense - bill)+ Friend.balance
    reNew(Friend)
    editFriend((freind)=> freind.map(f=> f === Friend ? Friend : f))
    reNew(false)
  }
  return (
    <form className="form-split-bill" onSubmit={(e)=>onSubmit(e)}>
      <h2>Split a bill with {Friend.name}</h2>

      <label>💰 Bill value</label>
      <input type="number" value={bill} onChange={(e)=>setBill(e.target.value)}/>

      <label>🧍 Your expense</label>
      <input type="number" value={yourExpense} onChange={(e)=>setYourExpense(e.target.value)}/>

      <label>👬 {Friend.name}'s expense:</label>
      <input type="number" disabled value={freindExpense}/>

      <label>Who is paying the bill?</label>
      <select value={option} onChange={(e)=>setOption(e.target.value)}>
        <option value="you">you</option>
        <option value={Friend.name}>{Friend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}

function Btn({children}){
  return <button className="button">{children}</button>
}