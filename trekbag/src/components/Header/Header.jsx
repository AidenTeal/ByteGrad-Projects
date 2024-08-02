import React from "react";
import Logo from "./Logo";
import Counter from "./Counter";
import { useItemsStore } from "../lib/itemsStore";

export default function Header() {
  const items = useItemsStore((state) => state.items);
  const itemsPacked = items.filter((item) => item.packed === true).length;

  return (
    <header>
      <Logo />
      <Counter itemsPacked={itemsPacked} totalItems={items.length} />
    </header>
  );
}
