import React from 'react'

export default function Warning( { warningText }) {
  return (
    <p className="warning"> No {warningText} tag allowed! </p>
  )
}
