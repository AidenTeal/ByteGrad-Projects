import React from 'react'

export default function Counter({itemsPacked, totalItems}) {

  return (
    <p>
     <b>{itemsPacked}</b> / {totalItems} items packed
    </p>
  )
}
