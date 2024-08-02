import React from 'react'

export default function Item({item, items, setItems, onToggleItem}) {
  const handleClick = () => {
    const newItems = items.filter((newItem) => item.id !== newItem.id);
    setItems(newItems);
  }

  return (
    <>
        <li className="item">
            <label htmlFor="1"> 
                <input 
                  id={item.id} 
                  type="checkbox" 
                  checked={item.packed}
                  onChange={() => onToggleItem(item.id)}
                />
                {item?.name} 
            </label>
            <button onClick={handleClick}>❌</button>
        </li>
    </>  
  )
}
