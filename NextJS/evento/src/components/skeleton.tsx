import { cn } from '@/lib/utils';
import React from 'react'

type TSkeleton = {
    className?: string;
}

export default function Skeleton({ className }: TSkeleton) {
  return (
    <div className={cn("h-4 w-[550px] rounded-md bg-white/5 animate-pulse", className)}/>
  )
}
