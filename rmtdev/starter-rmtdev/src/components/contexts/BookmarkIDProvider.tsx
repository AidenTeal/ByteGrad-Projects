import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { TJobItemContent } from "../lib/types";

interface BookmarkIDContextProps {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIDs: number[];
  bookmarkedJobItems: TJobItemContent[];
  isLoading: boolean;
}

export const BookmarkIDContext = createContext<BookmarkIDContextProps | null>(
  null
);

export default function BookmarkIDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIDs, setBookmarkedIDs] = useLocalStorage<number[]>(
    "bookmarkIDs",
    []
  );

  const { jobItemsInfo: bookmarkedJobItemsInfo, isLoading } =
    useJobItems(bookmarkedIDs);

  // event handlers / actions
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIDs.includes(id)) {
      setBookmarkedIDs(
        bookmarkedIDs.filter((bookmarkedID) => bookmarkedID !== id)
      );
    } else {
      setBookmarkedIDs([...bookmarkedIDs, id]);
    }
  };

  return (
    <BookmarkIDContext.Provider
      value={{
        bookmarkedIDs,
        handleToggleBookmark,
        bookmarkedJobItems: bookmarkedJobItemsInfo,
        isLoading: isLoading,
      }}
    >
      {children}
    </BookmarkIDContext.Provider>
  );
}
