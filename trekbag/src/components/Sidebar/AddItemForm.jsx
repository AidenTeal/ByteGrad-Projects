import React, { useRef, useState } from 'react'
import Button from '../Button'

export default function AddItemForm({onAddItem}) {

  const [itemText, setItemText] = useState("")
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
      
    // basic validation
    if (!itemText) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }

    onAddItem(itemText);
    setItemText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2> Add an item </h2>
      <input value={itemText} onChange={(e) => {
        setItemText(e.target.value);
      }}
      autoFocus={true}
      ref={inputRef}/>
      <Button> Add to list </Button>
    </form>
  )
}
