import { useState } from "react";
export function PackingList({item,handleDelete,onCheck,deleteAll}) {
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
      <button onClick={deleteAll}>clear list items</button>
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
