import React from 'react'

export default function Button({buttonType, children, onClick}) {
  return (
    <button onClick={onClick} className={`btn ${buttonType === 'secondary' ? 'btn--secondary' : ''}`}> {children} </button>
  )
}

