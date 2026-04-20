import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./form";
import { PackingList } from "./List";
import { Stats } from "./stats";
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
  function deleteAll(){
    const confirm = window.confirm('ARE YOU SURE THAT YOU WANT TO DELETE ALL ITEMS')
    if(confirm) setUpdate([])
  }
  return (
    <div className="app">
      <Logo />
      <Form update={addData}/>
      <PackingList item={updateData} handleDelete={handleDelete} onCheck={handlePacked} deleteAll={deleteAll}/>
      <Stats item={updateData}/>
    </div>
  );
}


