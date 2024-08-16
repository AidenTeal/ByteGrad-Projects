"use client"
import { createContext, useState } from "react"

export const PetContext = createContext(null);

export default function PetContextProvider({ data, children }: { data: TPets[],children: React.ReactNode }) {
  const [pets, setPets] = useState(data);
  const [selectedPetID, setSelectedPetID] = useState(null);
  return (
    <PetContext.Provider value={{ pets, selectedPetID}}>
      {children}
    </PetContext.Provider>
  )
}
