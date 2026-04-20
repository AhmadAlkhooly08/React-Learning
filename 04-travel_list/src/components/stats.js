export function Stats({item}) {
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
