import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TJobItem, TJobItemContent, UseSortedJobItemsProps } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface TJobItemAPIResponse {
  public: boolean;
  jobItem: TJobItemContent;
}

interface TJobItemsAPIResponse {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
}

// -------------------------------
  export function useJobItems(ids: number[]) {
    const results = useQueries({
      queries: ids.map((id) => ({
        queryKey: ['job-item', id],
        queryFn: () => fetchJobItemInfo(id),
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: id !== null,
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        },
      }))
    });

    const jobItemsInfo = results.map((result) => result.data?.jobItem).filter((jobItem) => jobItem !== undefined);
    const isLoading = results.some((result) => result.isLoading);

    return { jobItemsInfo, isLoading };
  }

const fetchJobItemInfo = async (
  activeID: number
): Promise<TJobItemAPIResponse> => {
  const data = await axios
    .get(`${BASE_API_URL}/${activeID}`)
    .then((response) => response.data)
    .catch((error) => {
      // throws an object with message property
      throw new Error(error.message);
    });

  return data;
};

export function useJobItemInfo(activeID: number | null) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-item", activeID],
    queryFn: () => (activeID ? fetchJobItemInfo(activeID) : null),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: activeID !== null,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const jobItemInfo = data?.jobItem;

  return [jobItemInfo, isInitialLoading] as const;
}

const fetchJobItems = async (
  searchText: string
): Promise<TJobItemsAPIResponse> => {
  const data = await axios
    .get(`${BASE_API_URL}?search=${searchText}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 400) {
        throw new Error("Search cannot contain special characters");
      } else {
        throw new Error(error.message);
      }
    });

  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => (searchText ? fetchJobItems(searchText) : null),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const jobItems = data?.jobItems === undefined ? [] : data.jobItems;

  return [jobItems, isInitialLoading] as const;
}

export function useActiveID() {
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {
    const handleChangeHash = () => {
      // adding '+' before window.location.hash.slice(1) converts it to a number
      const id = +window.location.hash.slice(1);
      if (id !== null) {
        setActiveID(id);
      }
    };
    handleChangeHash();

    window.addEventListener("hashchange", handleChangeHash);

    return () => {
      window.removeEventListener("hashchange", handleChangeHash);
    };
  }, []);

  return activeID;
}

export function useSortedJobItems({
  jobItems,
  setCurrentPage,
}: UseSortedJobItemsProps) {
  const [sortingType, setSortingType] = useState<"relevant" | "recent">(
    "relevant"
  );

  const handleSortType = (sortingType: "relevant" | "recent") => {
    setCurrentPage(1);
    setSortingType(sortingType);
  };

  const sortedJobItems =
    useMemo(() => jobItems?.slice().sort((a, b) => {
      if (sortingType === "recent") {
        return a.daysAgo - b.daysAgo;
      } else {
        return b.relevanceScore - a.relevanceScore;
      }
    }) || [], [jobItems, sortingType]);

  return [sortedJobItems, handleSortType, sortingType] as const;
}

export function useDebounce<T>(value: T, timeout = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => clearTimeout(timerID);
  }, [value, timeout]);

  return debouncedValue;
}

export function useLocalStorage<T>(
  storageName: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const localStorageData = JSON.parse(
    localStorage.getItem(storageName) || JSON.stringify(initialValue)
  );

  // state for bookmarked jobs
  const [value, setValue] = useState(() => localStorageData);

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(value));
  }, [value, storageName]);

  return [value, setValue] as const;
}

export function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    () => {
      document.removeEventListener("click", handleClick)
    };
  }, [refs, handler]);
}