"use client"
import { usePetContext, useSearchContext } from '@/lib/hooks';
import React from 'react'

export default function SearchForm() {
  const { handleUpdatePetSearch, petSearchTerm } = useSearchContext();

  return (
    <form className="w-full h-full">
        <input 
          className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/30" 
          placeholder="Search Pets"
          type="search"
          onChange={(e) => handleUpdatePetSearch(e.target.value)}
          value={petSearchTerm}
        />
    </form>
  )
}
