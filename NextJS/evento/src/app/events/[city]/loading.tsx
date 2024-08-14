import SkeletonCard from '@/components/skeleton-card'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-wrap max-w-[1100px] mx-auto px-[20px] py-24 gap-20">
      {
        Array.from({length: 6}).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      }
    </div>
  )
}
