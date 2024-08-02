import React from 'react'
import Button from '../Button'
import { useItemsStore } from '../lib/itemsStore'

export default function ButtonGroup() {

const handleCompleteAll = useItemsStore(state => state.handleCompleteAll);
const handleIncompleteAll = useItemsStore(state => state.handleIncompleteAll);
const handleResetAsInitial = useItemsStore(state => state.handleResetAsInitial);
const handleRemoveAllItems = useItemsStore(state => state.handleRemoveAllItems);

  return (
    <section className="button-group">
      <Button onClick={handleCompleteAll} type="secondary"> Mark all as complete </Button>
      <Button onClick={handleIncompleteAll} type="secondary"> Mark all as incomplete </Button>
      <Button onClick={handleResetAsInitial} type="secondary"> Reset to initial </Button>
      <Button onClick={handleRemoveAllItems} type="secondary"> Remove all items </Button>
    </section>
  )
}
