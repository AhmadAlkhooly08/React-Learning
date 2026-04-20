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

  function handleData(newData, newdata, e) {
    e.preventDefault();
    const tempImg =
      initialFriends[Math.trunc(Math.random() * (initialFriends.length - 1))]
        .image;
    const data = { name: newData, image: tempImg, id: Date.now(), balance: 0 };
    setNewFriend((friends) => [...friends, data]);
    newdata(false);
  }


  return (
    <div className="app">
      <List Friends={newFriend} onNewFriend={handleData} />
      <SplitBill />
    </div>
  );
}

function List({Friends, onNewFriend}) {
  const [addFr, setAdd] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {Friends.map((e) => (
          <ListItem data={e} key={e.id} />
        ))}
      </ul>
      {addFr && <Form hide={setAdd} setNewFriend={onNewFriend} />}
      <button className="button" onClick={() => setAdd((e) => !e)}>
        {addFr ? "close" : "add friend"}
      </button>
    </div>
  );
}
function ListItem({ data }) {
  return (
    <li>
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      <p className={data.balance > 0 ? "green" : data.balance < 0 ? "red" : ""}>
        {data.balance > 0
          ? `${data.name} owse you ${data.balance}£`
          : data.balance < 0
          ? `you owe ${data.name} ${Math.abs(data.balance)}£`
          : data.balance === 0
          ? `You and ${data.name} are even`
          : ""}
      </p>
      <button className="button">select</button>
    </li>
  );
}
function Form({ hide, setNewFriend }) {
  const [newData, setData] = useState();
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => setNewFriend(newData, hide, e)}
    >
      <label>👬 Friend name</label>
      <input
        type="text"
        value={newData}
        onChange={(e) => setData(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input type="text" />
      <button className="button">Add</button>
    </form>
  );
}
function SplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with Anthony</h2>
      <label>💰 Bill value</label>
      <input type="number" />
      <label>🧍 Your expense</label>
      <input type="number" />
      <label>👬 Friend expense:</label>
      <input type="number" />
      <label>Who is paying the bill?</label>
      <select>
        <option value="you">you</option>
        <option value="you">you</option>
      </select>
    </form>
  );
}
