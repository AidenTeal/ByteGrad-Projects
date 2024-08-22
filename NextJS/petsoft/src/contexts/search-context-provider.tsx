"use client";
import { createContext, useState } from "react";

type TPetContextProvider = {
  children: React.ReactNode;
};

type TSearchContext = {
    petSearchTerm: string;
    handleUpdatePetSearch: (searchTerm: string) => void;
}

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: TPetContextProvider) {
  const [petSearchTerm, setPetSearchTerm] = useState<string>("");
  
  const handleUpdatePetSearch = (searchTerm: string) => {
    setPetSearchTerm(searchTerm);
  };

  return <SearchContext.Provider value={{petSearchTerm, handleUpdatePetSearch}}>{children}</SearchContext.Provider>;
}
