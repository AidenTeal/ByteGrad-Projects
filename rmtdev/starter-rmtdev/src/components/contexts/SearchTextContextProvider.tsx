import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

interface SearchTextContextProps {
  searchText: string;
  handleChangeSearchText: (searchText: string) => void;
  debouncedSearchText: string;
}

export const SearchTextContext = createContext<SearchTextContextProps | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
   // state for search and job list
   const [searchText, setSearchText] = useState("");
   const debouncedSearchText = useDebounce(searchText, 250);

   // event handlers / actions
  const handleChangeSearchText = (searchText: string) => {
    setSearchText(searchText);
  }

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        handleChangeSearchText,
        debouncedSearchText
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
