import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href="/">
      <Image src="https://bytegrad.com/course-assets/react-nextjs/evento.png" alt="EVENTO Logo"
      width="53"
      height="12"
      />
    </Link>
    
  )
}
