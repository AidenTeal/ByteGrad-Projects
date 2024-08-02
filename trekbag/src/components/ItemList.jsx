import React, { useEffect, useMemo, useState } from 'react'
import Item from './Item'
import EmptyView from './EmptyView'
import Select from 'react-select'
import { useItemsStore } from './lib/itemsStore';

export default function ItemList() {
  const items = useItemsStore(state => state.items);
  const setItems = useItemsStore(state => state.handleSetItems);
  const handleToggleItem = useItemsStore(state => state.handleToggleItem);

  const options = [
    {
      label: "Sort by default",
      value: "default"
    },
    {
      label: "Sort by packed",
      value: "packed"
    },
    {
      label: "Sort by unpacked",
      value: "unpacked"
    }
  ]

  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(() => [...items].sort((a, b) => {
    if (sortBy === 'packed') {
      return b.packed - a.packed;
    }
    if (sortBy === 'unpacked') {
      return a.packed - b.packed;
    } 
    return;
  }), [items, sortBy])

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 ? 
        <section className="sorting">
          <Select onChange={(option) => setSortBy(option.value)} defaultValue={options[0]} options={options}/>
        </section> 
        : null}
      {sortedItems.map((item) => {
        return <Item item={item} items={items} setItems={setItems} onToggleItem={handleToggleItem}/>
      })}
    </ul>
  )
}
