import { useContext } from "react";
import { JobItemsContext } from "../JobItemsContextProvider";

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  // console.log("Context:", context); // Debugging line
  if (!context) {
    throw new Error("JobItemsContext is not found");
  }

  const { jobItems, jobItemsSortedForPage, isLoading, finalPage, sortType, handleSortType, handleChangePage, currentPage } = context;

  return { jobItems, jobItemsSortedForPage, isLoading, finalPage, sortType, handleSortType, handleChangePage, currentPage };

}
