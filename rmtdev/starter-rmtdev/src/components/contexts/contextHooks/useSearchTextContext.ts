import { useContext } from "react";
import { SearchTextContext } from "../SearchTextContextProvider";

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  // console.log("Context:", context); // Debugging line
  if (!context) {
    throw new Error("SearchContext is not found");
  }

  const { searchText, handleChangeSearchText, debouncedSearchText } = context;

  return { searchText, handleChangeSearchText, debouncedSearchText };
}
