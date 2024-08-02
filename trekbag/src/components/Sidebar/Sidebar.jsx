import React from "react";
import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";
import { useItemsStore } from "../lib/itemsStore";

export default function Sidebar() {
  const onAddItem = useItemsStore(state => state.handleAddItem);

  return (
    <div className="sidebar">
      <AddItemForm onAddItem={onAddItem} />
      <ButtonGroup />
    </div>
  );
}
