import React from 'react'

export default function ContentBlock({ children }: { children: React.ReactNode }) { 
  return (
    <div className="bg-[#F7f8FA] shadow-sm rounded-md overflow-hidden h-full w-full">
      {children}
    </div>
  )
}
