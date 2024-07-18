import React from 'react'
import BackgroundImage from './BackgroundImage'

export default function Header() {
  return (
    <header>
        <BackgroundImage />
        <h1 className="first-heading"> Word<span className="first-heading--thin">Analytics</span> </h1>
    </header>
  )
}
