import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSortedJobItems } from "../lib/hooks";
import { PageDirection, TJobItem } from "../lib/types";
import { useSearchTextContext } from "./contextHooks/useSearchTextContext";

interface JobItemsContextProps {
  jobItems: TJobItem[] | [];
  jobItemsSortedForPage: TJobItem[] | [];
  isLoading: boolean;
  finalPage: boolean;
  sortType: "relevant" | "recent";
  handleSortType: (sortType: "relevant" | "recent") => void;
  handleChangePage: (direction: PageDirection) => void;
  currentPage: number;
}

export const JobItemsContext = createContext<JobItemsContextProps | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();
  const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // state for sorting
  const [sortedJobItems, handleSortType, sortType] = useSortedJobItems({
    jobItems,
    setCurrentPage,
  });

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  // derived / computed state
  const jobItemsSortedForPage = useMemo(
    () => sortedJobItems.slice((currentPage - 1) * 7, currentPage * 7) || [],
    [sortedJobItems, currentPage]
  );

  const finalPage =
    jobItems === undefined
      ? true
      : Math.ceil(jobItems.length / 7) === currentPage;

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedForPage,
      isLoading,
      finalPage,
      sortType,
      handleSortType,
      handleChangePage,
      currentPage,
    }),
    [
      jobItems,
      jobItemsSortedForPage,
      isLoading,
      finalPage,
      sortType,
      handleSortType,
      handleChangePage,
      currentPage,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
