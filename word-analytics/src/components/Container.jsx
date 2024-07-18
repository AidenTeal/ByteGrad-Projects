import React, { useState } from 'react'
import Stats from './Stats'
import Textarea from './Textarea'

export default function Container() {
  const [text, setText] = useState("");

  return (
    <main className="container">
        <Textarea text={text} setText={setText}/>
        <Stats text={text}/>
    </main>
  )
}
